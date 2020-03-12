<template>
  <div ref="tuiEditor"></div>
</template>
<script>
  import Editor from 'tui-editor';
  import editorEvents from './editorEvents';
  import valueUpdateMethod from './valueUpdateMethod';
  import defaultOptions from './default-options'

  import 'codemirror/lib/codemirror.css' // codemirror
  import 'tui-editor/dist/tui-editor.css' // editor ui
  import 'tui-editor/dist/tui-editor-contents.css' // editor content

  export default {
    name: 'TuiEditor',
    options: {
      type: Object,
      default() {
        return defaultOptions
      }
    },
    props: {
   /*   value: {
        type: String,
        default: ''
      },*/
      /*id: {
        type: String,
        required: false,
        default() {
          return 'markdown-editor-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
        }
      },*/
      options: {
        type: Object,
        default() {
          return defaultOptions
        }
      },
      /*mode: {
        type: String,
        default: 'WYSIWYG'
      },*/
     /* height: {
        type: String,
        required: false,
        default: '300px'
      },
      language: {
        type: String,
        required: false,
        default: 'en_US' // https://github.com/nhnent/tui.editor/tree/master/src/js/langs
      },
      previewStyle:{
        type: String,
        required: false,
        default: 'tab'
      }*/
    },
    data() {
      return {
      };
    },
    computed: {
      editorOptions() {
        const options = Object.assign({},defaultOptions, this.options);
        options.initialValue = this.value;
        options.initialEditType = this.mode;
        options.height = this.height;
        options.previewStyle = this.previewStyle;
        return options;
      }
    },
    watch: {
      previewStyle(newValue) {
        this.editor.changePreviewStyle(newValue);
      },
      value(newValue, preValue) {
        if (newValue !== preValue && newValue !== this.editor.getValue()) {
          this.editor.setValue(newValue);
        }
      },
      height(newValue) {
        this.editor.height(newValue);
      },
      mode(newValue) {
        this.editor.changeMode(newValue);
      },
      html(newValue) {
        this.editor.setHtml(newValue);
        this.$emit('input', this.editor.getValue());
      },
      visible(newValue) {
        if (newValue) {
          this.editor.show();
        } else {
          this.editor.hide();
        }
      }
    },
    mounted() {
      const eventOption = {};
      editorEvents.forEach(event => {
        eventOption[event] = (...args) => {
          this.$emit(event, ...args);
        };
      });

      const options = Object.assign(this.editorOptions, {
        el: this.$refs.tuiEditor,
        events: eventOption
      });

      this.editor = new Editor(options);
      if (this.$listeners.input) {
        this.editor.on('change', () => {
          this.$emit('input', this.editor.getValue());
        });
      }
    },
    destroyed() {
      editorEvents.forEach(event => {
        this.editor.off(event);
      });
      this.editor.remove();
    },
    methods: {
      invoke(methodName, ...args) {
        let result = null;
        if (this.editor[methodName]) {
          result = this.editor[methodName](...args);
          if (valueUpdateMethod.indexOf(methodName) > -1) {
            this.$emit('input', this.editor.getValue());
          }
        }
        console.log(result);
        return result;
      }
    }
  }
</script>
<style>
  .toast.toast-img-icon{
    background-position: -130px -4px;
  }

</style>
