import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select'

import { ProjectSelectorWrapper } from './ProjectSelectorStyles';

const ProjectSelector = ({ value, onChange }) => {
    const { projects } = useSelector(state => state.projects);
    const options = useMemo(() => projects.map(({ id, name }) => ({ value: id, label: name })), [projects]);

    return (
        <ProjectSelectorWrapper>
            <Select
                className="project-selector"
                isMulti={true}
                options={options}
                styles={{
                    menuPortal: base => ({ ...base, zIndex: 9999 }),
                    input: base => ({ ...base, outline: 'none' })
                }}
                value={value}
                onChange={value => onChange(value)}
            />
        </ProjectSelectorWrapper>
    );
};

export default ProjectSelector;