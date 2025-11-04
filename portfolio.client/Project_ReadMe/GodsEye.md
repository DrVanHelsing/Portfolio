# GodsEye

## started: April 2025

GodsEye is an experimental gesture-controlled gaming mouse project. The goal is to provide a low-latency, reliable way to control cursor movement, mouse clicks, and gaming actions using facial gestures, head pose, eye gaze, and blink gestures. This repository is an early-stage prototype — many features are incomplete or experimental (see "Current status" below), and contributions are welcome.

> NOTE: This project is a work in progress. The blink-to-click feature currently does not work reliably and further features are planned. Use at your own risk and do not rely on it for accessibility-critical tasks until it is validated.

## Table of Contents
- Project status
- Goals
- Key features (planned and existing)
- Requirements
- Installation
- Quick start
- Configuration
- Troubleshooting and known issues
- Development notes
- Roadmap
- How to contribute
- License
- Contact

## Project status

- Maturity: Prototype / experimental
- Blink-to-click: Not working reliably yet (requires further research and tuning)
- Other gesture controls (head-pose, gaze, hand gestures): partially implemented depending on repository contents
- Tests: Limited or none

## Goals

- Provide a gesture-driven input system for mouse and game controls.
- Keep latency low and provide smooth cursor control suitable for gaming.
- Be extensible: allow custom gesture mappings and support for different detection backends (OpenCV, Mediapipe, dlib, etc.).
- Make it possible to use non-contact controls for gaming and accessibility scenarios.

## Key features

### Planned
- Blink-to-click (short blink = left click, long blink = right click / hold)
- Gaze-driven cursor movement with smoothing and sensitivity controls
- Head-tilt or nod gestures for scroll, special actions, or macro triggers
- Hand-gesture detection for additional bindings
- Profiles and per-game mappings

### Existing (may be partial)
- Face landmark detection pipeline (if present in repo)
- Head pose estimation utilities
- Cursor smoothing and mapping helpers
- Configuration scaffolding

## Requirements

- Operating system: Windows, macOS, or Linux (development and testing primarily on the OS used by contributors)
- Python 3.8+ (if the repo uses Python) or the language/framework already present in the repo
- OpenCV, Mediapipe or other computer vision libraries depending on chosen detection backend
- Access to a webcam
- Optional: GPU (for faster inference with some models)

If your repository uses a different language (C++, Rust, JavaScript/Node, etc.), install the appropriate runtime and packages listed in the project's existing dependency files (requirements.txt, Pipfile, package.json, cargo.toml, etc.).

## Installation (Python example)

1. Clone the repository

   ```bash
   git clone https://github.com/DrVanHelsing/GodsEye.git
   cd GodsEye
   ```

2. Create a virtual environment and activate it

   ```bash
   python -m venv venv
   source venv/bin/activate   # macOS / Linux
   venv\Scripts\activate    # Windows
   ```

3. Install dependencies

   ```bash
   pip install -r requirements.txt
   ```

If there is no requirements.txt in the repo, install typical packages used by CV projects:

   ```bash
   pip install opencv-python mediapipe numpy pyautogui
   ```

## Quick start

- Run the main application script (replace with the actual entrypoint file in this repo):

   ```bash
   python src/main.py
   ```

- Allow camera access when prompted.
- Calibrate the system (if a calibration step is provided) so that gaze/head normalization works for your camera and lighting.

## Configuration

- Sensitivity: adjust cursor sensitivity / smoothing parameters to match your mouse movement expectations.
- Blink thresholds: tune the short- and long-blink duration thresholds to reduce false positives and missed blinks.
- Smoothing / damping: increase smoothing to reduce jitter at the cost of responsiveness.

Look for a configuration file (config.yaml, config.json, or similar) in the repository. If one does not exist, create a file with commonly used options:

### Example config.json

```json
{
  "smoothing": 0.75,
  "sensitivity": 1.0,
  "blink_short_ms": 80,
  "blink_long_ms": 250,
  "gaze_mode": "relative",
  "head_pose_scale": 1.0
}
```

## Troubleshooting and known issues

- Blink-to-click not working: This is a known current limitation. Potential causes and mitigations:
  - False positives from rapid eye movements: increase the blink duration threshold or require a minimum inter-blink interval.
  - Missed blinks: lower the blink threshold and check camera frame rate; low frame rate makes blink detection unreliable.
  - Lighting / camera quality: improve lighting and use a higher resolution / higher frame-rate webcam.
  - Face landmark jitter: add temporal filtering (median / Kalman) to landmark positions.

- Cursor drift or jitter: increase smoothing, reduce sensitivity, or re-calibrate.

- High CPU usage: consider switching to a lighter detection model or using Mediapipe with GPU acceleration.

## Development notes

- Organize code into modules: detectors (face, eyes, hands), processors (blink logic, gaze mapping), and outputs (mouse control, game inputs).
- Keep a small, well-documented calibration routine for each detection modality.
- Unit tests for signal processing parts (e.g., blink detection logic) are easy to add and very helpful.

## Roadmap (suggested priorities)

1. Stabilize blink-to-click detection
   - Add frame-based blink debounce logic
   - Use eye-aspect-ratio (EAR) or multiple feature cues to detect blinks robustly
   - Add a calibration step that measures baseline eye openness

2. Improve gaze/cursor mapping
   - Add relative and absolute modes
   - Add per-axis sensitivity and deadzones
   - Add smoothing filters (exponential, biquad, or Kalman)

3. Add gesture mapping UI
   - Simple GUI that lets users bind gestures to mouse/buttons or keyboard macros

4. Add per-game profiles and shared presets

5. Optimize performance and lower latency

## How to contribute

- Open an issue describing the feature or bug you want to work on.
- Fork the repository, create a feature branch, and open a pull request when ready.
- Prefer small, focused PRs. Include unit tests for algorithmic changes where feasible.

When opening issues, include:
- Your OS and hardware specs
- Python / runtime version
- Camera model and framerate
- A short video or reproducible steps that show the problem

If you want to work on blink-to-click, some good first tasks are:
- Add a robust blink detector module (examples: EAR-based or a small CNN classifier)
- Add a calibration UI that samples open/closed eye baselines
- Add unit tests for the blink detection logic

## License

Include an SPDX license file or choose a license. If you have no preference, consider MIT:

### MIT License

Copyright (c) 2025 DrVanHelsing

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

[Full MIT text here or link to LICENSE file]

## Contact

- Author: DrVanHelsing
- Repo: https://github.com/DrVanHelsing/GodsEye

## Acknowledgements

- Mediapipe, OpenCV, dlib, and other open-source CV projects that make rapid prototyping possible.
