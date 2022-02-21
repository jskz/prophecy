import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SSLBoard from '../../components/SSLBoard';
import { loadSSLDomains } from '../../actions/ssl';

function SSL() {
    const dispatch = useDispatch();
    
    const loading = useSelector(state => state.ssl.loading);
    const domains = useSelector(state => state.ssl.domains);

    useEffect(() => {
        dispatch(loadSSLDomains());
    }, []);

    return (
        <div>
            <SSLBoard
                loading={loading}
                domains={domains} />
        </div>
    );
}

export default SSL;