# Mobile topic selector — design QA

final result: passed

## Selected target and scope

The user's final image attachment supersedes their earlier numeric selection. It matches the topic-field and bottom-sheet concept `/workspace/generated_images/exec-d5a904b0-7c4f-4452-899c-5c83420c3e00.png`. The inline accordion was replaced before publication. Scope: mobile topics such as Bits & Bytes, Zahlensysteme and Zahlen im Speicher, across courses. Main-area select and individual lesson arrows remain separate controls. Desktop topic tabs remain available.

The selected design uses a labelled Thema field, current topic and chevron, then a bottom modal with Thema wählen, close control, topic icons, selected check, outlined unselected indicators and grouped rows. No new raster assets are needed: existing branding, DM Sans and standard Lucide icons match the app. Real topic lists/counts come from the curriculum.

## Visual comparison evidence

Reference and rendered open state were inspected together in `/tmp/codeklar-topic-sheet-comparison.png`, 796 × 874 including labels. The reference is displayed at 390px wide preserving its natural ratio; the rendered app is 390 × 844. Local rendered states: `/tmp/codeklar-topic-sheet-open-390.png` and `/tmp/codeklar-topic-field-closed-390.png`. Both show Computer verstehen / Bits, Zahlen & Dateien / Bits & Bytes, green accent.

The field, chevron, sheet title, row hierarchy, topic icons and separate lesson control match the selected structure. Existing text/surface/accent variables retain all color themes. Deliberate accessibility adaptations: topic names stay 16px, tappable rows at least 48px, long labels wrap, the panel uses a definite 48dvh height with internal scrolling instead of a smaller raster-derived panel. This produces more panel height than the reference. Native dialog backdrop dims/inerts background controls; focus remains visibly indicated. These choices preserve readability and prevent the earlier clipped-list failure. No actionable P0/P1/P2 findings remain in the inspected scope.

## Behavior and verification

Seven focused Chromium/Playwright tests passed, including topic selection across categories and lessons, keyboard opening/Escape/focus return, selected-row focus, close and backdrop dismissal, internal scrolling/reopening the final topic, narrow and short viewports (320 × 568, 390 × 844, 667 × 375), desktop resizing, group/course changes, task reset to explanation, lesson-list regression, chapter navigation and loop-task progress. Browser page identity, console, framework overlay and horizontal overflow checks passed. Topic selection closes the sheet and the field displays the new topic. The current topic remains stable during individual lesson changes.

Production build passed with the existing large-bundle warning. Two freshly built PWA tests passed offline: topic sheet navigation and existing lesson arrow/list navigation with solved-progress persistence.

## Previous mobile list correction

The previous iPhone screenshot showed an almost completely clipped lesson list. That issue was not reproduced in local Chromium. Lesson sheets retain a definite responsive height, an internally scrolling flex list and selected-row revealing that changes only list scrollTop. The Computer lesson-sheet regression remains green at narrow and short viewport sizes.

## Limits

Browser plugin not available; local Playwright Chromium used. WebKit browser binary unavailable. Real iPhone Safari and touch gestures on hardware remain untested. The exact cause of the originally reported Safari clipping is not claimed as confirmed. Course/lesson selection after reload follows existing app behavior; only progress persistence is asserted. Screenshot artifacts are outside the repository.
