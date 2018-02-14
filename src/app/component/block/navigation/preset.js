/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('navigation', require('./navigation.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
			{{> navigation @root}}
		</hbs>`,
  require('./data.json'),
);
