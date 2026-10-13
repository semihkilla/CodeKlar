# Mobile lesson list — corrective QA

Result: local Chromium checks passed; the reported iPhone Safari issue still needs hardware confirmation.

## Scope and evidence

The user reported a clipped lesson list on Computer verstehen / Bits & Bytes: only the sheet heading and a sliver of a row were visible. The previous Chromium-only pass did not establish Safari compatibility. The original selected design remains `/workspace/generated_images/exec-c37b1d07-19c6-4bc3-9eb6-19205342b4fa.png`; this correction deliberately gives the list more space than that mock.

- Before: `/tmp/codeklar-computer-list-before.png`, actual course, 390 × 844 mobile/touch Chromium. The reported clipping was not reproduced in this browser (list client height 239px).
- After: `/tmp/codeklar-computer-list-fixed.png`, same viewport/course, last lesson selected and visible. All seven rows remain reachable.
- Additional rendered states: `/tmp/codeklar-lesson-switcher-open-390.png`, `/tmp/codeklar-lesson-switcher-open-320.png`.

## Changes

The sheet now has a definite responsive height (60dvh, capped at 560px and available viewport height), instead of only a maximum height. The flex list receives the remaining space and scrolls independently. Short screens use the available height above bottom navigation. The current row is revealed by changing only the list scrollTop; scrollIntoView no longer scrolls ancestor containers. The close button and title remain outside the scrolling list. Existing typography, color themes, row wrapping and desktop controls are preserved.

The proposed replacement for the horizontal topic row is not implemented: the user requested design alternatives first.

## Validation

Five focused Chromium tests passed: arrow/list interaction, topic scroll regression, long names, rendered mobile states, and the new Computer lesson-list regression at 390 × 844, 320 × 568 and 667 × 375. The regression checks at least 110px of list space, a fully visible first row, fully visible selected last row after reopening, no ancestor dialog scrolling, and a visible heading. Existing checks cover keyboard focus, Escape/close/backdrop/swipe logic, body scroll restoration, desktop resizing and console errors.

Production build passed; the existing large-chunk warning remains. The freshly built PWA passed its offline lesson-navigation and solved-progress test.

## Limits

Browser plugin not available; local Playwright Chromium used. WebKit browser binary unavailable. Real iPhone Safari and touch gestures on hardware remain untested; the exact Safari root cause is not claimed as confirmed. Screenshots are local QA artifacts outside the repository.
