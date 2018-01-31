/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('paragraph', require('./paragraph.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
			{{> paragraph @root}}
		</hbs>`,
  {},
);
