"""Render the two real Matplotlib lesson previews (requires the lesson packages)."""
import os
from pathlib import Path
from tempfile import TemporaryDirectory


def main():
    output = Path(__file__).resolve().parents[1] / 'public' / 'examples'
    output.mkdir(parents=True, exist_ok=True)
    with TemporaryDirectory() as cache:
        os.environ.setdefault('MPLCONFIGDIR', cache)
        import matplotlib
        matplotlib.use('Agg')
        import matplotlib.pyplot as plt
        plt.rcParams.update({'font.size': 22, 'axes.labelsize': 24,
                             'xtick.labelsize': 22, 'ytick.labelsize': 22})
        fig, ax = plt.subplots(figsize=(8, 4.5), dpi=100, layout='constrained')
        ax.plot([1, 2, 3], [2, 4, 3], marker='o', color='#176a43', linewidth=3)
        ax.set_xlabel('Tag'); ax.set_ylabel('Punkte')
        ax.set_xticks([1, 2, 3]); ax.set_ylim(0, 5)
        ax.grid(axis='y', alpha=.2)
        fig.savefig(output / 'python-mpl-line.png'); plt.close(fig)
        fig, ax = plt.subplots(figsize=(8, 4.5), dpi=100, layout='constrained')
        ax.bar(['Essen', 'Fahrt'], [7, 3], color=['#176a43', '#215f9f'])
        ax.set_ylabel('Euro'); ax.set_ylim(0, 8)
        ax.set_axisbelow(True); ax.grid(axis='y', alpha=.2)
        fig.savefig(output / 'python-mpl-bar.png'); plt.close(fig)


if __name__ == '__main__':
    main()
