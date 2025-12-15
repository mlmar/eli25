export function parseDateString(dateString: string | null | undefined): string {
    if (dateString) {
        return new Date(dateString).toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    }
    return ''
}