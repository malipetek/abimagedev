export function getImageIdentifier(uri) {
    let image_identifier = null;
    try {
        const u = new URL(uri);
        image_identifier = u.pathname.split('/').pop();
    } catch (e) {
        image_identifier = 'unknown';
    }
    return image_identifier
}
