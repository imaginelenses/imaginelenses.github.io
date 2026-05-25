---
title: 'Pixels To Steps - Cartpole Stabilisation from Pixels'
date: '2026-05-26'
when: 'May 2026'
techStack: ['python', {'Gymnasium': 'https://gymnasium.farama.org/'}, {'NumPy': 'https://numpy.org/'}, 'sklearn', 'Control Systems', 'Computer Vision', 'State Estimation']
source: 'https://github.com/imaginelenses/pixelsToSteps'
---

Cartpole stabilisation from pixels alone, with no angle or position sensor at inference time. Implements the linear vision-based control framework of {% link "https://arxiv.org/abs/2406.18699", "Lee et al." %}, adapted for simulation in Gym CartPole. A student policy trained on 40 teacher demonstrations achieves **100% survival across 100 random initial conditions** under plant mismatch, running as a single matrix multiply at 60 Hz.

<img src="https://raw.githubusercontent.com/imaginelenses/pixelsToSteps/main/assets/demo.gif" alt="Web UI demo showing cartpole stabilisation from pixels" class="fullWidth" style="border-radius: 10px;" decoding="async" loading="lazy">

**Data collection.** A privileged teacher with full state access runs an LQR policy, with the gain computed offline by solving the discrete-time algebraic Riccati equation, and logs state, input, and pixel frame tuples.

**Observer training.** A hybrid Luenberger observer is fit to the collected demonstrations. The nominal dynamics matrices are fixed from linearisation around the upright equilibrium; only the pixel-to-angle mapping is learned via Ridge regression on flattened binary frames produced by Gaussian blur and Otsu thresholding.

**Inference.** The observer blends the open-loop dynamics prediction with the pixel-derived angle estimate at a fixed weight and closes the loop with the LQR gain. No angle sensor is used.

**Key Results:**

<div class="tableWrapper"><table>
<thead><tr><th>Demos</th><th>Pixel-to-angle R²</th><th>Pixel-to-angle RMSE</th><th>Survival</th><th>Paper-success*</th></tr></thead>
<tbody>
<tr><td>20</td><td>0.980</td><td>0.181°</td><td>96/100</td><td>75/100</td></tr>
<tr><td><strong>40</strong></td><td><strong>0.987</strong></td><td><strong>0.123°</strong></td><td><strong>100/100</strong></td><td><strong>72/100</strong></td></tr>
</tbody>
</table></div>

\* Paper-success: cart within 0.176 m, pole within 2° at t = 2.5 s.

The 72% paper-success rate is meaningful in context: the original paper's observer corrects all 4 states directly from pixels; this implementation corrects only the pole angle (1 state), with cart position propagated entirely by the open-loop dynamics. The 72% reflects accumulated cart position drift, not instability; survival is 100%.
