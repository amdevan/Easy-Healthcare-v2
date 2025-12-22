<div
    x-data="{ q: null }"
    x-init="()
        => { const el = $refs.editor; const QuillCtor = window.Quill; if (!QuillCtor) return; q = new QuillCtor(el, { theme: 'snow' }); q.root.innerHTML = @js($getState() ?? ''); q.on('text-change', () => { $wire.set(@js($getStatePath()), q.root.innerHTML); }); }"
    class="space-y-2"
>
    <link href="https://cdn.jsdelivr.net/npm/quill@2/dist/quill.snow.css" rel="stylesheet" />
    <div wire:ignore x-ref="editor" class="min-h-[180px] border border-gray-300 rounded-md"></div>
    <script src="https://cdn.jsdelivr.net/npm/quill@2/dist/quill.js"></script>
</div>
