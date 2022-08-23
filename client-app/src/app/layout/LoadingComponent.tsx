import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

interface Props {
    inverted?: boolean;
    content?: string;
}

export default function LoadingComponent({
    inverted = true,
    content = 'Loading...',
}: Props) {
    return (
        // <React.Fragment>
        <Dimmer active inverted={inverted}>
            <Loader content={content} />
        </Dimmer>
        // </React.Fragment>
    );
}

/*
#region --------------  Notes  --------------------
Warning: findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of RefFindNode which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node
    at div
    at RefFindNode (http://localhost:3000/static/js/bundle.js:1777:35)
    at Ref (http://localhost:3000/static/js/bundle.js:1710:24)
    at DimmerInner (http://localhost:3000/static/js/bundle.js:65873:29)
    at Dimmer (http://localhost:3000/static/js/bundle.js:65687:29)
    at LoadingComponent (http://localhost:3000/static/js/bundle.js:273:5)
    at observerComponent (http://localhost:3000/static/js/bundle.js:13594:69)
    at Routes (http://localhost:3000/static/js/bundle.js:54297:5)
    at div
    at Container (http://localhost:3000/static/js/bundle.js:62109:24)
    at observerComponent (http://localhost:3000/static/js/bundle.js:13594:69)
    at Router (http://localhost:3000/static/js/bundle.js:54230:15)
    at BrowserRouter (http://localhost:3000/static/js/bundle.js:53039:5)
#endregion -----------  Notes  --------------------

ref is in C:\Users\caryc\Projects\Vista Outdoor\demos\CleanDemo\client-app\node_modules\semantic-ui-react\dist\umd\semantic-ui-react.min.js
*/
