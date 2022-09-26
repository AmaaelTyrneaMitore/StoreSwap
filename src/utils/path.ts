import { dirname } from 'path';
export default dirname((require.main ?? { filename: '' }).filename);
// path.dirname(process.mainModule.filename); // deprecated
