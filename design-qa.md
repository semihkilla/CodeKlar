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

## Java curriculum expansion verification

The later Java content expansion preserves the selected topic selector and lesson arrows. Java now uses six main groups and the same readable guided lesson layout, with multiline output options in quizzes. Local mobile reading evidence: `/tmp/codeklar-java-reader-current.png` and `/tmp/codeklar-java-mobile.png`; inspected at 390 × 844. Browser checks cover 320/390/1505 widths without page overflow, topic-field use within Java, every Java lesson's question/answer and persisted progress, reference search and project downloads. Six focused browser tests and one built-PWA offline test passed. The 130 new complete programs were separately compiled and executed with OpenJDK 21, source/target 17 fallback, with all expected outputs matching. Three project test suites (21 checks) and interactive/file-persistence checks passed. No claim of an in-browser Java runtime or real iPhone Safari testing is made.

## Further Java tutorials and API help

The new Java lesson help follows the existing reading layout. API contracts and independent exercises start collapsed. Parameter names, return values and mutation effects use a consistent 16px reading rhythm; full code and expected output remain separate. The same API component is available in Java reference entries without the independent exercise section. Ten additional context-sensitive glossary definitions explain relevant terms. Visual evidence `/tmp/codeklar-java-method-help.png` was inspected at 390 × 844; width checks cover 320/390/768/1505. Existing topic and lesson selection are preserved.

Seven focused browser checks passed, including rendering and grading all 191 Java lessons, persistence, project ZIP completeness and linked lessons, contracts and collapsed states, hint/solution disclosure and narrow-screen overflow. After reference integration, its three affected checks passed again. The final built PWA passed both offline checks, including the new Regex tutorial, glossary, API contract and local exercise solution. All 190 complete learning programs and twelve practice solutions produced their expected outputs under OpenJDK 21; the existing source/target 17 fallback limitation remains. Five project suites passed 37 explicit checks and interactive, persistence, UTF-8 report and basket integration checks. Build passed with the existing size warning. Hardware Safari remains untested. No new actionable P0/P1/P2 issue was found in this scope.

## Next Java language and algorithm material

The latest content expansion preserves the selected navigation and existing reading/help components. Java now has 231 lessons, 24 local exercises and 116 method/syntax contracts. Seventeen new examples use explicit imports and short type names to reduce long package-qualified code on mobile. Fresh evidence `/tmp/codeklar-java-dependencies-mobile.png` was captured again after that change; source code is separately scrollable and the page has no horizontal overflow at 320/390/1505. Local exercise instructions, optional hints and full solutions retain their existing disclosure behavior.

Six focused browser checks passed, including every Java knowledge question and progress after reload, preservation of prior answers, chapter/ID consistency, complete project ZIPs and the advanced dependency exercise. Its mobile view passed again after the import change. Final build and two PWA offline checks passed. All 230 runnable lesson programs and 24 exercise solutions matched their outputs; seven project suites passed 56 checks, including four real HTTP requests to a temporary loopback server and shortest-route reconstruction/unreachable output. OpenJDK 21 with the documented source/target 17 fallback was used. The browser does not execute Java or host the API. Native hardware Safari remains untested. No new actionable P0/P1/P2 finding was identified in this scope.
