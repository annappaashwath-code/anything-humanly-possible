Fix only the vertical gesture scroll on the Human Achievements page. Do not work on horizontal carousel yet.

Goal:
Hand gestures must scroll the page up/down smoothly, with zero lag, zero jump, and no accidental triggers.

Gesture mapping:

“Go” gesture (push hand forward) → scroll DOWN the page

“Come” gesture (pull hand toward you) → scroll UP the page

Implementation rules (must do all):

Add calibration (required)
When user enables gesture control:

Show “Calibrating…” for 2 seconds

Ask user to hold hand steady in the camera

Record baseline depth + position

Use baseline to normalize movement so gestures work at different camera distances

Use depth-based motion for push/pull
Detect push/pull using Z-depth change of the palm/wrist landmark.

If Z moves away beyond threshold → “Go”

If Z moves toward beyond threshold → “Come”

Smooth the landmarks (fix jitter)
Apply landmark smoothing (EMA / OneEuroFilter) on wrist + palm landmarks so the motion is stable.
Do not use raw landmark positions.

Dead zone + threshold
Ignore tiny movements.

Require minimum depth delta (threshold) before any scrolling starts

Require minimum sustained motion for at least 150–250ms before activating

Direction lock (vertical only)
Once vertical gesture is detected:

Lock to vertical mode until the gesture ends

Ignore any sideways movement during vertical mode

Continuous scroll with speed control
While user continues pushing/pulling:

Scroll continuously, not in steps

Map speed to depth velocity (faster push = faster scroll)

Apply max speed cap to avoid spikes

Apply easing so it feels premium

Stop behavior
Scrolling must stop instantly when:

Hand stops moving

Hand leaves camera

Confidence drops below threshold

Safety + stability

Add 400–600ms cooldown after gesture ends (prevents re-trigger)

Add “Tracking stable / Hand not detected” status in the bottom guide

If tracking is unstable, do nothing (no random scroll)

Keep normal scroll untouched
Mouse/touch trackpad scrolling must still work as normal.
Gesture scroll is optional and only active when camera is enabled.

Testing requirement
Test vertical scroll until it is:

Smooth

Predictable

No lag

No jitter

Works repeatedly

Do not change any UI design. Only fix vertical gesture scrolling.