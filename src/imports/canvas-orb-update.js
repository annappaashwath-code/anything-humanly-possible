Edit the existing canvas orb overlay code with these changes:

Molecule size consistency across breakpoints

Right now particle (molecule) radius scales with the orb, which makes them look too big on mobile.

Fix by clamping particle radius in screen pixels:

particleRadiusPx = clamp(baseValue * scaleFactor, 0.8px, 1.8px)

Same for spark dots if present:

sparkRadiusPx = clamp(baseValue * scaleFactor, 0.7px, 2.2px)

The goal: molecules should remain visually consistent and never become chunky on small screens.

Add subtle glow to each molecule (very light, premium)

For each particle drawn, add a small radial gradient glow around it:

inner: rgba(255,255,245, 0.35)

mid: rgba(255,210,120, 0.14)

outer: rgba(255,180,70, 0.00)

Keep glow radius small (2–4x the particle size), no heavy bloom.

Add “beeping” micro pulse per molecule

Each particle should have a tiny opacity pulse that is slightly out of phase from others:

opacity = baseOpacity * (0.85 + 0.15 * sin(time*2.8 + particlePhase))

Also allow a tiny size pulse (optional but subtle):

size = radiusPx * (0.92 + 0.08 * sin(time*2.2 + particlePhase))

Keep everything else the same

Orb stays pinned using ORB_CX/ORB_CY/ORB_R scaled from IMG_W/IMG_H

No percentage positioning

Canvas oversize stays to prevent glow clipping

Do not increase overall noise or intensity

Output requirement:

Return the updated single code block

Add a small “TUNE HERE” section with:

particleMinPx, particleMaxPx, sparkleMinPx, sparkleMaxPx, pulseSpeed