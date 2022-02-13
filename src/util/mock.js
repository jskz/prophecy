export const MOCK_PROJECT_DATA = [
    { id: 1, name: 'LWEB PROJECT', hours_invested: 15.0 },
    { id: 2, name: 'LWEB 2nd', hours_invested: 15.3 },
    { id: 3, name: 'BIGSAAS', hours_invested: 40 },
    { id: 4, name: 'JMIW', hours_invested: 90 }
];

export const MOCK_JOB_DATA = [
    { id: 1, name: 'Legacy Web Project', budget: 7000.00, project_status: 'In Development', project_ids: [1, 2], resources: [{ id: 2, allocation: 0.7 }] },
    { id: 2, name: 'Big SaaS Project', budget: 270000.00, project_status: 'In Development', project_ids: [3], resources: [{ id: 2, allocation: 0.3 }, { id: 3, allocation: 1.0 }] },
    { id: 3, name: 'Just Make It Work!', budget: 20.00, project_status: 'In Development', project_ids: [4], resources: [] }
];

export const MOCK_RESOURCE_DATA = [
    { id: 1, name: 'James Skarzinskas', roles: ['DEVELOPER', 'PROJECT_MANAGER'] },
    { id: 2, name: 'Ivana Code', roles: ['DEVELOPER'] },
    { id: 3, name: 'Bob Dobbs', roles: ['DEVELOPER'] }
];