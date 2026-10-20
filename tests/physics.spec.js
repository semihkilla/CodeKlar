import { test, expect } from '@playwright/test';
import { physicsCompassLessons, physicsAreas } from '../src/physicsLessons.js';
import { physicsModels } from '../src/physicsModels.js';
import { groupTopics } from '../src/topicGroups.js';
import { scienceLessons } from '../src/scienceLessons.js';

async function openLesson(page, lesson) {
 await page.getByRole('button',{name:'Übungen',exact:true}).click();
 await page.getByLabel('Lernbereich filtern').selectOption('physics');
 await page.getByLabel('Aufgaben suchen …').fill(lesson.title);
 await page.getByRole('row').filter({has:page.getByText(lesson.title,{exact:true})}).click();
}
async function range(page,name,value){await page.getByRole('slider',{name,exact:true}).fill(String(value));}

test('physics compass covers all 100 topics and model values obey independent physical comparisons',()=>{
 expect(physicsCompassLessons).toHaveLength(100);expect(physicsAreas).toHaveLength(12);
 expect(physicsAreas.map(a=>a.lessonIds.length)).toEqual([6,9,6,8,9,9,9,8,10,8,9,9]);
 const all=scienceLessons.filter(l=>l.course==='physics');expect(all).toHaveLength(144);expect(new Set(all.map(l=>l.id)).size).toBe(144);
 expect(groupTopics('physics',all)).toHaveLength(12);expect(groupTopics('physics',all).flatMap(g=>g.lessons).map(l=>l.id).sort()).toEqual(all.map(l=>l.id).sort());
 expect(physicsCompassLessons.filter(l=>l.physicsStudy.practice)).toHaveLength(26);
 for(const area of physicsAreas){expect(physicsModels[area.id]).toBeTruthy();expect(area.goal.length).toBeGreaterThan(40);for(const id of area.lessonIds)expect(physicsCompassLessons.some(l=>l.id===id)).toBe(true);}
 for(const lesson of physicsCompassLessons){expect(lesson.guide[1]).toHaveLength(3);expect(new Set(lesson.options).size).toBe(3);expect(lesson.explanation).toBeTruthy();expect(lesson.useCase).toBeTruthy();}
 const value=(area,a,b)=>physicsModels[area].calculate(a,b).value;
 expect(value('mechanics',20,5)/value('mechanics',10,5)).toBeCloseTo(4);
 expect(value('fluids',1,1000)).toBeCloseTo(9.81);expect(value('heat',30,20)).toBeCloseTo(5+25/Math.E);
 expect(value('electric',5,100)).toBe(50);expect(value('magnetism',100,.1)).toBeCloseTo(1);
 expect(value('waves',4,0)).toBe(.5);expect(value('optics',10,30)).toBe(15);expect(value('quantum',620,1)).toBe(2);
 expect(value('quantum',620,10)).toBe(2);expect(value('relativity',.6,1)).toBeCloseTo(1.25);
 expect(value('nuclear',2,1)).toBe(25);expect(value('applied',10,2)).toBe(5);
 for(const model of Object.values(physicsModels))for(const a of [model.a[2],model.a[1],model.a[3]])for(const b of [model.b[2],model.b[1],model.b[3]]){
  const r=model.calculate(a,b);expect(Number.isFinite(r.value)).toBe(true);expect(r.points.every(([x,y])=>Number.isFinite(x)&&Number.isFinite(y)&&y<=r.ymax+1e-6&&y>=(r.ymin||0)-1e-6)).toBe(true);
 }
});

test('physics roadmap models maths and self assessment work on phone and desktop',async({page})=>{
 test.setTimeout(240000);const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 await page.setViewportSize({width:390,height:844});await page.goto('/');await page.getByLabel('Lernbereich wählen',{exact:true}).selectOption('physics');
 await expect(page).toHaveTitle(/codeklar/);await page.locator('.physics-compass > summary').click();await expect(page.locator('.physics-area-list > details')).toHaveCount(12);
 const card=page.locator('.physics-area-list > details').nth(1);await card.locator('summary').click();await card.getByRole('button',{name:'In diesem Bereich weiterlernen →',exact:true}).click();await expect(page.locator('.lesson-panel h2')).toHaveText('Kinematik: Ort ist nicht Weg');
 await page.locator('.physics-lab > summary').click();await expect(page.locator('.physics-result')).toContainText('10 m');await range(page,'Geschwindigkeit',20);await expect(page.locator('.physics-result')).toContainText('40 m');
 await page.locator('.physics-lab > details > summary').click();await expect(page.locator('.physics-table table')).toBeVisible();
 for(const mode of ['Hell','Dunkel']){await page.getByRole('button',{name:'Design und Webapp'}).click();await page.getByRole('radio',{name:mode,exact:true}).click();await page.keyboard.press('Escape');for(const width of [320,390,768,1505]){await page.setViewportSize({width,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}await page.setViewportSize({width:390,height:844});await page.locator('.physics-lab').scrollIntoViewIfNeeded();await page.screenshot({path:`/tmp/codeklar-physics-${mode}-390.png`,animations:'disabled'});}
 for(const area of physicsAreas){const lesson=physicsCompassLessons.find(l=>l.id===area.lessonIds[0]);await openLesson(page,lesson);await page.getByRole('tab',{name:'Erklärung',exact:true}).click();await expect(page.locator('.lesson-panel math').first()).toBeVisible();await page.locator('.physics-lab > summary').click();const model=physicsModels[area.id];await range(page,model.a[0],model.a[3]);await expect(page.locator('.physics-result')).toContainText(model.calculate(model.a[3],model.b[1]).label);await expect(page.locator('.physics-plot')).toBeVisible();}
 const lesson=physicsCompassLessons.find(l=>l.id==='physics-compass-vectors');await openLesson(page,lesson);await page.getByRole('tab',{name:'Erklärung',exact:true}).click();await page.locator('.physics-practice > summary').click();await page.getByLabel('Dein Rechenergebnis',{exact:true}).fill('14');await page.getByRole('button',{name:'Rechnung prüfen',exact:true}).click();await expect(page.locator('.physics-practice [role=status]')).toContainText('Noch nicht');await page.getByLabel('Dein Rechenergebnis',{exact:true}).fill('10,0');await page.getByRole('button',{name:'Rechnung prüfen',exact:true}).click();await expect(page.locator('.physics-practice [role=status]')).toContainText('Richtig');
 await page.locator('.physics-skills > summary').click();await page.getByRole('checkbox',{name:/Beschreiben/}).check();await page.getByRole('checkbox',{name:/Verstehen/}).check();await page.reload();await openLesson(page,lesson);await page.getByRole('tab',{name:'Erklärung',exact:true}).click();await page.locator('.physics-skills > summary').click();await expect(page.getByRole('checkbox',{name:/Verstehen/})).toBeChecked();await expect(page.locator('.physics-skills > summary')).toContainText('2/5');
 expect(errors).toEqual([]);await expect(page.locator('vite-error-overlay')).toHaveCount(0);
});

test('all new physics lessons grade persist and complete the twelve roadmap areas',async({page})=>{
 test.setTimeout(240000);const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/');
 await page.getByRole('button',{name:'Physik-Grundlagen',exact:true}).click();let areaId;
 for(const lesson of physicsCompassLessons){if(areaId!==lesson.physicsStudy.area){areaId=lesson.physicsStudy.area;await page.getByLabel('Hauptbereich',{exact:true}).selectOption(areaId);await page.locator('.topic-tabs').getByRole('button',{name:lesson.category,exact:true}).click();}await page.locator('.desktop-lesson-picker').getByRole('button',{name:lesson.name,exact:true}).click();await page.getByRole('tab',{name:'Aufgabe',exact:true}).click();await page.getByRole('radio').nth(lesson.answer).click();await page.getByRole('button',{name:'Antwort prüfen',exact:true}).click();await expect(page.locator('.quiz-feedback')).toContainText('Richtig');}
 await page.reload();await page.getByRole('button',{name:'Physik-Grundlagen',exact:true}).click();await expect(page.locator('.physics-compass > summary')).toContainText('12/12');
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('codeklar-progress-v1')));for(const lesson of physicsCompassLessons)expect(saved.solved[lesson.id]).toBeTruthy();expect(errors).toEqual([]);
});

test('physics competency feedback remains usable when storage is blocked',async({page})=>{
 await page.addInitScript(()=>{Object.defineProperty(Storage.prototype,'setItem',{value(){throw Error('blocked');}});});await page.goto('/');await openLesson(page,physicsCompassLessons[0]);await page.getByRole('tab',{name:'Erklärung',exact:true}).click();await page.locator('.physics-skills > summary').click();await page.getByRole('checkbox',{name:/Beschreiben/}).check();await expect(page.locator('.physics-skills')).toContainText('für diese Sitzung');
});
