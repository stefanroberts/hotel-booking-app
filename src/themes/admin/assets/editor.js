// Initialize Monaco Editor
require.config({ paths: { vs: '/assets/vendor/monaco-editor/min/vs' } });

require(['vs/editor/editor.main'], function() {
  const editor = monaco.editor.create(document.getElementById('monaco-editor'), {
    value: '',
    language: 'html',
    theme: 'vs-dark',
    automaticLayout: true
  });

  // File tree handling
  const fileTree = document.getElementById('fileTree');
  fileTree.addEventListener('click', async (e) => {
    const li = e.target.closest('li');
    if (!li) return;

    const path = li.dataset.path;
    try {
      const response = await fetch(`/admin/themes/editor/file?path=${path}`);
      const content = await response.text();
      
      const language = path.endsWith('.css') ? 'css' : 
                      path.endsWith('.js') ? 'javascript' : 
                      path.endsWith('.liquid') ? 'html' : 'plaintext';
      
      monaco.editor.setModelLanguage(editor.getModel(), language);
      editor.setValue(content);
    } catch (error) {
      console.error('Error loading file:', error);
    }
  });

  // Auto-save functionality
  let saveTimeout;
  editor.onDidChangeModelContent(() => {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(async () => {
      const content = editor.getValue();
      try {
        await fetch('/admin/themes/editor/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content,
            path: currentFile
          })
        });
      } catch (error) {
        console.error('Error saving:', error);
      }
    }, 1000);
  });
});