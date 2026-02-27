export function isMobile(): boolean {
    return /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(
        navigator.userAgent,
    );
}

export async function shareText(text: string | undefined): Promise<void> {
    if (!text) {
        return;
    }

    if (isMobile() && navigator.canShare) {
        const shareData = {
            text: text,
        };
        if (navigator.canShare(shareData)) {
            try {
                await navigator.share(shareData);
            } catch (error) {
                alert('Sharing not supported for this device.');
                console.error(error);
            }
        }
    } else if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    }
}