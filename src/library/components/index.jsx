import * as custom from '../../components'
import One from './One/One';
import Two from './Two/Two';
import Render from './Render/Render';

const library = { One, Two, Render };

export default Object.assign({}, library, custom);
