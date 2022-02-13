import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select'

import { ResourceSelectorWrapper } from './ResourceSelectorStyles';

const ResourceSelector = ({ value, onChange }) => {
    const { resources } = useSelector(state => state.resources);
    const options = useMemo(() => resources.map(({ id, name }) => ({ value: id, label: name })), [resources]);

    return (
        <ResourceSelectorWrapper>
            <Select
                className="resource-selector"
                isMulti={true}
                options={options}
                styles={{
                    menuPortal: base => ({ ...base, zIndex: 9999 }),
                    input: base => ({ ...base, outline: 'none' })
                }}
                value={value}
                onChange={(value, action) => onChange(value, action)}
            />
        </ResourceSelectorWrapper>
    );
};

export default ResourceSelector;