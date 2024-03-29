const defaultColor = ['pink', 'yellow', 'green', 'blue', 'purple', 'gold'];

export function getColorStatus() {
    const randomIndex = Math.floor(Math.random() * defaultColor.length);

    return defaultColor[randomIndex];
}