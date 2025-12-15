export function parseDateString(dateString: string | null | undefined): string {
    if (dateString) {
        return new Date(dateString + 'T00:00:00').toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    }
    return ''
}