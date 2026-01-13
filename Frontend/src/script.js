document.addEventListener('DOMContentLoaded', () => {
    const marquee = document.querySelector('.marquee');
    if (marquee) {
        const colors = ['#FFFFFF', '#10B981', '#3B82F6', '#A78BFA','#F59E0B'];
        let idx = 0;
        marquee.style.color = colors[idx];
        marquee.addEventListener('animationiteration', () => {
            idx = (idx + 1) % colors.length;
            marquee.style.color = colors[idx];
        });
    }

    const imageInput = document.getElementById("imageInput");
    const uploadBtn = document.getElementById("uploadBtn");
    const preview = document.getElementById("preview");
    const result = document.getElementById("result");
    const errorEl = document.getElementById("error");

    if (!imageInput || !uploadBtn) return;

    let selectedFile = null;

    /* Preview image */
    function isImageFile(file) {
        if (!file) return false;
        if (file.type && file.type.startsWith("image/")) return true;
        const name = file.name || '';
        return /\.(jpe?g|png|gif|webp|bmp|tiff?|heic|heif|svg)$/i.test(name);
    }

    function showError(msg, timeout = 5000) {
        if (!errorEl) { console.warn('Error element missing:', msg); return; }
        errorEl.textContent = msg;
        errorEl.classList.remove('hidden');
        clearTimeout(showError._t);
        showError._t = setTimeout(() => {
            errorEl.classList.add('hidden');
            errorEl.textContent = '';
        }, timeout);
    }

    function clearError() {
        if (!errorEl) return;
        clearTimeout(showError._t);
        errorEl.classList.add('hidden');
        errorEl.textContent = '';
    }

    imageInput.addEventListener("change", () => {
        selectedFile = imageInput.files[0];

        if (!selectedFile) {
            showError("No file selected");
            return;
        }

        // More robust validation: allow when MIME type missing by falling back to file extension
        if (!isImageFile(selectedFile)) {
            showError("Please upload a valid image file");
            imageInput.value = "";
            selectedFile = null;
            if (preview) {
                preview.src = '';
                preview.classList.add('hidden');
            }
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            if (!preview) return;
            preview.alt = selectedFile.name || 'preview image';
            preview.classList.remove("hidden");
            preview.style.display = 'block';
            preview.style.maxWidth = '320px';
            preview.style.width = '100%';
            preview.style.height = 'auto';
            preview.style.objectFit = 'contain';

            // Try data URL first
            preview.onerror = null;
            preview.src = reader.result;

            // If data URL can't be rendered, fallback to object URL
            preview.onerror = () => {
                try {
                    const obj = URL.createObjectURL(selectedFile);
                    preview.onerror = () => {
                        URL.revokeObjectURL(obj);
                        preview.classList.add('hidden');
                        showError('Preview not supported for this file type — you can still upload it.');
                    };
                    preview.onload = () => {
                        clearError();
                        URL.revokeObjectURL(obj);
                    };
                    preview.src = obj;
                } catch (e) {
                    preview.classList.add('hidden');
                    showError('Preview not supported for this file type — you can still upload it.');
                }
            };

            try { preview.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch(e){}
            clearError();
        };
        reader.readAsDataURL(selectedFile);
    });

    /* Upload image */
    uploadBtn.addEventListener("click", async () => {
        if (!selectedFile) {
            showError("Select an image first");
            return;
        }

        clearError();
        if (result) result.textContent = "Uploading & analyzing...";

        const formData = new FormData();
        formData.append("image", selectedFile);

        try {
            const res = await fetch("http://localhost:5000/upload", {
                method: "POST",
                body: formData
            });

            const data = await res.json();
            if (result) result.textContent = data.description || "No description returned";
            clearError();

        } catch (err) {
            console.error(err);
            if (result) result.textContent = "Upload failed. Is backend running?";
            // showError("Upload failed. Is backend running?");
        }
        imageInput.value = "";
        selectedFile = null;
    });
});
