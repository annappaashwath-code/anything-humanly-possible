Fix the Human Achievements gesture interactions completely. They are still laggy and unreliable.

Do not change the page design.
Do not change layout.
Only fix gesture control logic, performance, and stability.

Before handover, test every gesture end-to-end on desktop (webcam) and ensure it works smoothly without lag.

1) Fix vertical scroll (still lagging)

Vertical hand scroll must be smooth and consistent.

Gesture mapping:

“Go forward” (push hand away) → scroll DOWN the page

“Come here” (pull hand toward you) → scroll UP the page

Fix issues by doing all of this:

Use landmark smoothing (EMA / OneEuroFilter) on wrist + index MCP landmarks

Use velocity-based scrolling, not jump scrolling

Add a dead zone: ignore tiny movements under a threshold

Add direction lock: once vertical scroll is detected, lock to vertical until gesture ends

Add max scroll speed cap to avoid sudden spikes

Stop scrolling immediately when gesture stops

Reduce lag by throttling updates to requestAnimationFrame

2) Fix horizontal carousel swipe (currently not working)

Horizontal swipe must scroll ONLY the achievements carousel, smoothly.

Rules:

Horizontal swipe triggers ONLY when pointer/hand is inside carousel area

Direction lock: once horizontal is detected, lock to horizontal until gesture ends

Add proper swipe threshold + cooldown so one swipe = one controlled movement

Keep infinite carousel loop behavior intact

No interference with vertical page scroll

3) Fix point to select + open popup (still broken)

Pointing must reliably open the FULL story popup (not only image).

Behavior:

Show on-screen pointer tracking index fingertip

Highlight card under pointer

If pointer stays steady on a card for 600–900ms, open the FULL story modal (same as normal click)

Ensure modal loads content correctly every time

Stability fixes:

Smooth pointer tracking (EMA / OneEuroFilter)

Add “hold-to-confirm” ring/indicator so user knows it will open

Add selection confidence threshold (only act when tracking confidence is high)

4) Fix open palm to close (must work every time)

When modal is open:

Open palm gesture closes modal

Hold open palm for 400–700ms to confirm close

Prevent accidental close (only close when palm is clearly detected + modal is open)

Close animation returns smoothly back to carousel

5) Calibration (required)

Gesture control must start with a quick calibration step.

When user enables gesture control:

Show “Calibrating…” for 2 seconds

Ask user to hold hand steady in view

Capture baseline hand position + scale

Use baseline to normalize movement so gestures work across different camera distances

6) Performance + reliability requirements

No jitter

No lag spikes

No double triggers

Add cooldown between actions (300–600ms)

Add “Tracking stable / Hand not detected” status in guide

If tracking lost, pause gesture control quietly (do not break page)

7) Fallback must always work

If camera is off / denied:

Normal scrolling works

Carousel drag/arrows work

Clicking cards opens modal normally

Deliverable quality

Fix everything above and test it fully:

Vertical scroll works

Horizontal carousel swipe works

Point to open popup works

Open palm closes popup works

Calibration works
No handover until all gestures work reliably.