/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('footer', require('./footer.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
			{{> footer @root}}
		</hbs>`,
  require('./default.json'),
);
