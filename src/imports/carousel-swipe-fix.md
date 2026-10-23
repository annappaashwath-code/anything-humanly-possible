Perfect. Now we fix **horizontal carousel swipe only**.
Do not touch vertical scroll. Do not change design.

Copy-paste this prompt into Figma Make:

---

Fix only the **horizontal gesture swipe** for the Human Achievements carousel.

Do not modify vertical scroll logic.
Do not redesign anything.

Goal:
Hand swipe left/right must scroll the achievements carousel smoothly, reliably, and only inside the carousel area.

Gesture mapping:

• Swipe hand left → carousel moves right
• Swipe hand right → carousel moves left

Implementation rules (must follow all):

1. Restrict to carousel zone
   Horizontal gesture must only activate when:

* Pointer/hand is inside the carousel bounding area
* Modal is not open

If hand is outside carousel region → ignore horizontal gesture.

2. Direction detection (X-axis only)
   Use index fingertip or wrist X movement to detect swipe.

* Ignore minor sideways drift.
* Require minimum X delta threshold before triggering.

3. Direction lock
   Once horizontal swipe is detected:

* Lock to horizontal mode
* Ignore vertical motion until gesture ends

4. Dead zone + threshold
   Add minimum movement threshold:

* Require sustained X movement for 150–250ms
* Prevent accidental triggers from micro hand shake

5. Continuous controlled scroll
   While swiping:

* Scroll carousel smoothly (not in jumps)
* Add light inertia effect
* Cap max velocity
* Use easing curve for premium feel

6. Infinite loop must remain intact
   Carousel must continue looping infinitely.
   No snapping glitches.
   No card overlap issues.

7. Cooldown
   After swipe completes:

* Add 400–600ms cooldown
* Prevent double triggering

8. Stability

* Apply landmark smoothing (EMA / OneEuroFilter)
* Ignore low confidence frames
* If tracking unstable → do nothing

9. Must not interfere with vertical scroll
   If vertical movement is dominant:

* Do not trigger horizontal swipe

10. Must not break normal controls
    Mouse drag, touch swipe, arrows must still work normally.

Testing requirement:
Test horizontal swipe repeatedly until:

* No jitter
* No accidental triggers
* No lag
* Smooth infinite loop
* Works on desktop webcam

Do not touch any other interaction.
Only fix horizontal carousel gesture reliability.

---

After this is stable, we move to fixing point-to-select + modal open.
