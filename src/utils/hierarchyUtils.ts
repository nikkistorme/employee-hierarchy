/**
 * Updates the max height of parent accordion panels when a child panel is expanded/collapsed
 * @param panel - The child panel element
 * @param heightDelta - The change in height (positive or negative)
 */
export const updateParentPanelHeights = (panel: HTMLElement, heightDelta: number): void => {
  // Find parent panel (start from panel's parent to exclude itself)
  const parentPanel = panel.parentElement?.closest('.hierarchy__accordion-panel') as HTMLElement | null;

  if (parentPanel) {
    const currentMaxHeight = parentPanel.style.maxHeight ?
      parseInt(parentPanel.style.maxHeight.replace('px', '')) : 0;
    const newMaxHeight = currentMaxHeight + heightDelta;
    parentPanel.style.maxHeight = newMaxHeight + 'px';

    // Recursively update the next parent level
    updateParentPanelHeights(parentPanel, heightDelta);
  }
};

/**
 * Handles accordion toggle behavior for hierarchy nodes
 * @param e - The mouse click event
 */
export const toggleHandler = (e: React.MouseEvent<HTMLDivElement>): void => {
  const target = e.target as HTMLElement;

  const button = target.closest('button') as HTMLButtonElement | null;
  if (!button) return; // Not a button click

  const expanded = button.getAttribute('aria-expanded') === 'true';
  button.setAttribute('aria-expanded', expanded ? 'false' : 'true');

  const panelId = button.getAttribute('aria-controls');
  if (!panelId) return;

  const panel = document.getElementById(panelId);
  if (!panel) return;

  if (expanded) {
      // Collapsing: delay setting hidden to allow CSS transition to complete
    setTimeout(() => {
      panel.setAttribute('aria-hidden', 'true');
      panel.setAttribute('hidden', '');
    }, 300);

    // Collapsing: set height to 0 and subtract from parents
    panel.style.maxHeight = '0px';
    updateParentPanelHeights(panel, -panel.scrollHeight);
  } else {
    // Expanding: remove hidden immediately
    panel.setAttribute('aria-hidden', 'false');
    panel.removeAttribute('hidden');

    // Expanding: set height to scrollHeight and update parent panel max-heights
    panel.style.maxHeight = panel.scrollHeight + 'px';
    updateParentPanelHeights(panel, panel.scrollHeight);
  }
};