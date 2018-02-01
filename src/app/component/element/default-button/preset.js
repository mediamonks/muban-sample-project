/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('default-button', require('./default-button.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
			{{> default-button @root}}
		</hbs>`,
  {},
);
