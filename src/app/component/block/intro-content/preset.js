/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('intro-content', require('./intro-content.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
			{{> intro-content @root}}
		</hbs>`,
  require('./default.json'),
);
