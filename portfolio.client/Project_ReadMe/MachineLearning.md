# MachineLearning
Machine Learning basics implemented as three notebook assignments: Linear Regression, Logistic Regression, and Neural Networks.

This repository contains hands-on assignments that demonstrate foundational supervised learning algorithms. Each assignment is provided as a Jupyter Notebook in its respective folder. The notebooks are designed for learning and experimentation: you can read the theory notes inline, run the code cells, and tweak hyperparameters (learning rate, polynomial degree, number of hidden units, etc.) to see the effect.

## Projects

- Linear Regression
	- Path: `Linear Regression/CSC312 - Assignment 1 - Linear Regression.ipynb`
	- Purpose: Introduce linear regression for regression tasks. The notebook implements hypothesis functions, cost (mean squared error), gradient descent, and (where applicable) closed-form solutions. It shows feature engineering such as polynomial feature expansion and feature normalization.
	- What you'll find: data loading and visualization, implementation of the cost function, parameter updates via gradient descent, plots of fitted curves, and experiments with learning rates and polynomial degrees to illustrate underfitting/overfitting.
	- Inputs / outputs: Input — tabular dataset(s) included in the notebook cells (or generated synthetically). Output — trained parameter vector (theta), plots of predictions vs. ground truth, and training loss curves.

- Logistic Regression
	- Path: `Logistic Regression/CSC312 - Assignment 2 - Logistic Regression.ipynb`
	- Purpose: Teach binary classification using logistic regression. The notebook implements the sigmoid activation, logistic cost (cross-entropy), gradient descent optimization, and visualization of the decision boundary.
	- What you'll find: data visualization for separable and non-separable examples, implementation of the logistic cost and gradient, training loop with accuracy reporting, and optional regularization to control overfitting.
	- Inputs / outputs: Input — labeled 2D classification dataset(s) (or synthetic examples). Output — trained weights, classification decision boundary plots, confusion/accuracy metrics, and examples of regularization effects.

- Neural Networks
	- Path: `Neural Networks/CSC312 - Assignment 3 - Neural Networks.ipynb`
	- Purpose: Introduce feedforward neural networks and backpropagation for multi-layer models and multi-class classification.
	- What you'll find: forward propagation, cost (cross-entropy for classification), backpropagation to compute gradients, weight initialization, and an optimization loop (batch or mini-batch gradient descent). The notebook typically includes exercises to vary the number of hidden units, learning rates, and see how these choices affect training.
	- Inputs / outputs: Input — dataset for classification (features and labels). Output — trained network weights, training and validation accuracy/loss plots, and sample predictions.

## How to run the notebooks

1. Install requirements (a minimal list that should cover the notebooks):

```powershell
python -m pip install --upgrade pip
pip install jupyterlab notebook numpy scipy matplotlib pandas scikit-learn
```

2. Start Jupyter from the repository root and open the notebook you want:

```powershell
jupyter lab
# or
jupyter notebook
```

3. Run cells in order. Each notebook contains inline explanations and visualization cells. If a notebook expects local data files, the dataset will be either generated inside the notebook or placed alongside the notebook in the same folder.

## Experimentation tips
- Try different learning rates and plot the loss curve to observe convergence or divergence.
- For linear regression, experiment with polynomial feature degrees and compare training vs validation error to see under/overfitting.
- For logistic regression and neural networks, try L2 regularization and different network sizes to observe generalization behavior.

## Files of interest
- `Linear Regression/CSC312 - Assignment 1 - Linear Regression.ipynb` — linear regression assignment and experiments.
- `Logistic Regression/CSC312 - Assignment 2 - Logistic Regression.ipynb` — logistic regression assignment and experiments.
- `Neural Networks/CSC312 - Assignment 3 - Neural Networks.ipynb` — neural network implementation with forward/backprop and training.

## Notes
- The notebooks are intended for education and experimentation; they're self-contained and annotated with equations and plots to connect the math to the code.
- If you want, I can: add a `requirements.txt`, extract reusable Python modules from the notebooks, or add short example scripts to run training from the command line.
