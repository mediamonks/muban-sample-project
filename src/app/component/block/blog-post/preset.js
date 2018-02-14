/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('blog-post', require('./blog-post.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
			{{> blog-post @root}}
		</hbs>`,
  require('./data.json'),
);
