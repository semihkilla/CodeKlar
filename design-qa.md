# Mobile lesson selector — design QA

final result: passed

## Target and scope

Selected visual truth: `/workspace/generated_images/exec-c37b1d07-19c6-4bc3-9eb6-19205342b4fa.png` (the user-approved combination of method arrows and a bottom lesson list).
Scope: replace the mobile individual-lesson strip only. Existing topic navigation, lesson content, workspace tabs, branding, desktop lesson strip and stored progress remain part of the production app.
Implementation: `http://localhost:5173/`, JavaScript Arrays, `.map()`, green accent, modal list open.

## Evidence and normalization

- Source: 853 × 1844 pixels. Compared at 390 CSS px wide with natural image ratio (approximately 843 px tall); no artificial stretching.
- Implementation: 390 × 844 pixels at deviceScaleFactor 1.
- Full comparison input: `/tmp/codeklar-selector-comparison-final.png` (796 × 874, including comparison labels).
- Focused controls: `/tmp/codeklar-selector-focus-controls.png`.
- Focused list: `/tmp/codeklar-selector-focus-sheet.png`.
- Rendered states: `/tmp/codeklar-lesson-switcher-open-390.png`, `/tmp/codeklar-lesson-switcher-closed-390.png`, `/tmp/codeklar-lesson-switcher-open-320.png`.
- Source and implementation were opened together in the combined full and focused comparison inputs. Screenshots are outside the repository.

## Findings and comparison history

1. [P2, fixed] Initial list used a 75dvh cap and obscured the step controls. Evidence: `/tmp/codeklar-lesson-switcher-open-first.png` and `/tmp/codeklar-selector-comparison-first.png`. The modal was reduced, then reviewed at the same 390 × 844 viewport and open state.
2. [P2, fixed] The intermediate 54dvh panel still took more of the reading context than needed. Final cap is 44dvh; list rows are at least 56 px. Flex layout keeps header visible while only the list scrolls, including long names and the final row. Short viewports use a larger available-height cap.
3. [Expected production constraints] The actual Arrays category contains 12 lessons, not the mock's illustrative eight. Counts and rows come from real data. Existing main-category/workspace controls and lesson markup remain. Native modal backdrop dims and inerts the background, including bottom navigation. These are deliberate scope/accessibility decisions rather than claims of whole-screen replication.

No actionable P0/P1/P2 findings remain after the final comparison.

## Fidelity surfaces

- Typography: existing DM Sans; 16 px readable method names, 14 px current-position text, 13 px row-position annotations, 22 px panel title. Names wrap instead of truncating. Existing readability preferences take priority over smaller raster text in the mock.
- Spacing/layout: three-part arrow/current/arrow grid, grouped list with separators, rounded top corners, fixed lower placement above existing mobile navigation. Controlled row heights and internal scrolling preserve the selected structure.
- Colors: existing background/surface/border/accent variables; green selected in evidence, user-selected purple/blue/green remain supported. Current row uses accent text, checkmark and a subtle tint.
- Assets: existing brand retained; standard Lucide arrows, chevron, close, check and grip indicator. No new imagery was implied by this scoped component; no raster or fake decorative asset added.
- Copy: German labels match the intended interaction; counts, current lesson and solved markers reflect actual curriculum/progress.

## Interaction checks

Chromium/Playwright verified previous/next, first/last disabled states, task-to-explanation reset, selected-row focus, native modal focus return, Escape, close button, backdrop dismissal, downward pointer gesture, body scroll restoration, desktop resizing, long names, final-row scrolling with header remaining visible, topic scroll regression and unchanged desktop controls. Page identity, meaningful content, framework overlay and console checks passed.
Built PWA verified offline arrow/list use, JavaScript grading and solved markers after reload. Build passed (existing main-bundle size warning remains).

## Remaining gaps

Real iPhone Safari and an actual touch swipe on hardware are untested; pointer gesture logic is exercised in Chromium. Default lesson selection after a page reload follows the existing app behavior; only progress persistence is asserted. Images show the scoped component, not a whole-app restyle.
