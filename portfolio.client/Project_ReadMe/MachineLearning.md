# MachineLearning

## started & completed: 2024

Repository: DrVanHelsing/MachineLearning

Overview

This repository collects machine learning experiments, reference models, reproducible training pipelines, and utilities developed for research and educational purposes. The content is organized to make it easy to reproduce experiments, compare model variants, and extend the code for new datasets or tasks.

High-level goals
- Provide clear, runnable examples for common supervised and unsupervised ML tasks.
- Maintain reproducible configs and small example datasets or dataset-download helpers.
- Document outcomes and baseline numbers so contributors can reproduce and improve results.

Contents

- data/ - dataset downloaders and preprocessing scripts.
- notebooks/ - Jupyter notebooks demonstrating experiments and visualizations.
- src/ - source code for models, training, and utilities.
- models/ - pointers to trained model checkpoints and scripts to fetch them (large files not always committed).
- scripts/ - command-line scripts to run training, evaluation, and preprocessing.
- configs/ - YAML configuration files for experiments and hyperparameters.
- tests/ - unit and integration tests.
- README.md - this file.

Tasks, Datasets, and Outcomes (detailed)

This section summarizes the main experiments in the repository, the datasets used, expected setup, and representative outcomes (baseline metrics). Exact results depend on config, random seed, hardware, and dataset preprocessing; refer to the corresponding notebook or config for run-specific numbers.

1) Image classification — MNIST and CIFAR-10
- Purpose / Task: Supervised image classification to demonstrate model training, augmentation, and evaluation pipelines.
- Models: Small CNN, ResNet18 (lightweight configuration), and a simple MLP baseline.
- Datasets:
  - MNIST (handwritten digits) — small, fast for smoke tests and unit tests.
  - CIFAR-10 (10-class natural images) — standard image classification benchmark.
- Scripts / Notebooks:
  - scripts/download_data.py --dataset mnist|cifar10
  - notebooks/mnist_classification.ipynb
  - configs/image_classification/*.yaml
- Typical outcomes (baseline examples):
  - MNIST small CNN: test accuracy ≈ 98–99% after ~5–10 epochs (with standard augmentations).
  - CIFAR-10 ResNet18: test accuracy ≈ 85–92% depending on augmentation and training budget.
- Notes:
  - Use lightweight configs for CI and smoke tests (fewer epochs, smaller batch size).
  - Larger runs (full training) are expected to improve CIFAR-10 numbers.

2) Text classification — movie reviews / sentiment analysis
- Purpose / Task: Binary and multi-class text classification using word-level and transformer-based models.
- Models: BiLSTM baseline with pretrained embeddings, small Transformer (distil-like) for comparison.
- Datasets:
  - IMDB movie reviews (binary sentiment).
  - AG News (4-class topic classification).
- Scripts / Notebooks:
  - notebooks/text_classification.ipynb
  - configs/text_classification/*.yaml
- Typical outcomes:
  - IMDB baseline (BiLSTM + pretrained embeddings): accuracy ≈ 86–90%.
  - Small Transformer variant: accuracy improves modestly (≈ 90–94%) depending on pretraining and training steps.
- Notes:
  - Tokenization and vocabulary building are implemented in src/utils/tokenizer.py (or use Hugging Face tokenizers if configured).

3) Tabular prediction — regression and classification
- Purpose / Task: Demonstrate preprocessing, feature engineering, and model selection on small tabular datasets.
- Models: Gradient-boosted trees (XGBoost/LightGBM) and simple feedforward networks.
- Datasets:
  - UCI datasets (e.g., Boston Housing replacement, Wine Quality).
  - Synthetic datasets produced by scripts/data_synth.py for unit tests.
- Typical outcomes:
  - Tabular benchmarks usually favor tree-based models; expect RMSE / accuracy baselines in notebook cells.
- Notes:
  - Provide clear preprocessing steps (imputation, scaling, categorical encoding) in scripts/preprocess_tabular.py.

4) Unsupervised learning — clustering and dimensionality reduction
- Purpose / Task: Demonstrate PCA, t-SNE, and simple clustering pipelines; used mainly for EDA and representation analysis.
- Algorithms / Implementations: PCA (scikit-learn), t-SNE, KMeans, simple autoencoder in src/models/autoencoder.py.
- Datasets:
  - MNIST (visualization of learned embeddings).
  - Synthetic blobs for clustering sanity checks.
- Typical outcomes:
  - Visual separability of classes in 2D embeddings; clustering NMI/ARI numbers included in notebooks.

5) Segmentation / Object detection (example experiments)
- Purpose / Task: Provide reference scripts for segmentation using small U-Net variants and detection using lightweight models (examples only; not production-grade).
- Datasets:
  - Small subsets of Cityscapes / VOC for demonstration (download scripts provided where allowed), or synthetic masks in data/.
- Typical outcomes:
  - Qualitative segmentation masks and IoU baselines recorded in the corresponding notebooks.

Reproducibility & Evaluation

- configs/ contains base configs for each experiment. Use them to reproduce reported outcomes:
  - Example: python src/train.py --config configs/image_classification/cifar10_resnet18.yaml --data data/cifar10 --output experiments/run001
- Seeds: Set deterministic seeds in src/utils/seed.py. Note that perfect determinism across devices (GPU) may require additional flags (PyTorch deterministic flags).
- Metrics & Logging: Training writes metrics to the experiment output directory. We support:
  - TensorBoard (logs saved under <output>/tensorboard)
  - CSV or JSON metrics for CI-friendly checks (e.g., tests/check_metrics.py).
- Checkpoints: Models are saved to <output>/checkpoints. Checkpoint retention and artifact upload are left to the user's CI or external storage scripts.

How to run the example experiments (quick)

1. Setup
```bash
python -m venv .venv
source .venv/bin/activate   # Linux / macOS
.\venv\Scripts\activate     # Windows PowerShell
python -m pip install -r requirements.txt
```

2. Prepare data (example)
```bash
python scripts/download_data.py --dataset mnist --out data/mnist
python scripts/preprocess.py --input data/mnist --output data/processed/mnist
```

3. Run training (example for CIFAR-10)
```bash
python src/train.py --config configs/image_classification/cifar10_resnet18.yaml --data data/cifar10 --output experiments/cifar_resnet18_run1
```

4. Evaluate
```bash
python src/eval.py --checkpoint experiments/cifar_resnet18_run1/checkpoints/best.pt --data data/processed/cifar10
```

Project Structure (detailed)

- data/: scripts and small samples for dataset fetching and preprocessing. Do NOT commit large raw datasets.
- docs/: optional documentation and design notes.
- notebooks/: interactive analyses and reproducible experiments (e.g., notebooks/mnist_classification.ipynb).
- src/: modular codebase organized roughly as:
  - src/models/: model definitions (PyTorch / TensorFlow / scikit-learn wrappers)
  - src/train.py: training loop and logging
  - src/eval.py: evaluation and metrics reporting
  - src/utils/: helper functions for IO, metrics, visualization, and seeding
- scripts/: convenience CLI wrappers for common tasks (download, preprocess, train, eval)
- configs/: YAML config files for experiments and hyperparameters
- tests/: unit tests for core utilities and smoke tests for training pipeline

Coding Conventions

- Follow PEP8 for Python code.
- Use type hints where helpful; run mypy if configured.
- Add tests for new features and ensure CI passes.

Best Practices for Large Files

- Large artifacts (datasets, large model checkpoints) should be stored externally (S3, Zenodo, GCS, etc.) and not committed.
- Use Git LFS for large binary artifacts that must be stored in the repo.

Contributing

Contributions are welcome. Please follow these steps:

1. Fork the repository.
2. Create a feature branch: git checkout -b feature/my-feature
3. Implement tests and ensure they pass.
4. Open a pull request with a clear description and reference to the experiment config.

Please adhere to the code of conduct in CODE_OF_CONDUCT.md if present.

Licensing

This project is provided under the MIT License — see LICENSE for details. If no license is present, contact the repository owner.

Contact

For questions or to share results, open an issue or contact the maintainer: @DrVanHelsing on GitHub.

Examples, Badges, and Next Steps

- See notebooks/mnist_classification.ipynb and notebooks/text_classification.ipynb for run-to-end examples.
- If you’d like, the README can be augmented with:
  - Badges for CI, codecov, or model zoo links.
  - Links to model checkpoints stored externally.
  - A short CHANGELOG and contributor guidelines (CONTRIBUTING.md).

```