import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select'

const ProjectSelector = ({ value, onChange }) => {
    const { projects } = useSelector(state => state.projects);
    const options = useMemo(() => projects.map(({ id, name }) => ({ value: id, label: name })), [projects]);

    return (
        <Select
            isMulti={true}
            options={options}
            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
            value={value}
            onChange={value => onChange(value)}
        />
    );
};

export default ProjectSelector;