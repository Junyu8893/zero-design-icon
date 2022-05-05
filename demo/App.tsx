import { defineComponent, h } from 'vue';
import IconDemo from './icon-demo.vue';

export default defineComponent({
  setup() {
    return () => {
      return (
        <div>
          <IconDemo />
        </div>
      );
    };
  },
});
