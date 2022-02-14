export const MOCK_PROJECT_DATA = [
    { id: 1, name: 'LWEB PROJECT', hours_invested: 15.0 },
    { id: 2, name: 'LWEB 2nd', hours_invested: 15.3 },
    { id: 3, name: 'BIGSAAS', hours_invested: 40 },
    { id: 4, name: 'JMIW', hours_invested: 90 },
    { id: 5, name: 'THINGOMATIC', hours_invested: 0 },
    { id: 6, name: 'OTHERTEST', hours_invested: 2.4 }
];

export const MOCK_JOB_DATA = [
    { id: 1, name: 'Legacy Web Project', budget_hours: 50, budget: 7000.00, project_status: 'In Development', project_ids: [1, 2], resource_ids: [2], allocations: {2: 0.7} },
    { id: 2, name: 'Big SaaS Project', budget_hours: 800, budget: 270000.00, project_status: 'In Development', project_ids: [3], resource_ids: [2, 3], allocations: {2: 0.3, 3: 0.9} },
    { id: 3, name: 'Just Make It Work!', budget_hours: 30, budget: 20.00, project_status: 'In Development', project_ids: [4], resource_ids: [1], allocations: {1: 0.7} },
    { id: 4, name: 'Thing-o-matic Integration', budget_hours: 70, budget: 5000.00, project_status: 'Pending', project_ids: [5], resource_ids: [3], allocations: {3: 0.1} },
    { id: 5, name: 'Other Test', budget_hours: 10, budget: 1000.00, project_status: 'In Development', project_ids: [6], resource_ids: [1], allocations: {1: 0.3} }
];

export const MOCK_RESOURCE_DATA = [
    { id: 1, name: 'James Skarzinskas', roles: ['DEVELOPER', 'PROJECT_MANAGER'], weekly_hours: 50 },
    { id: 2, name: 'Ivana Code', roles: ['DEVELOPER'], weekly_hours: 40 },
    { id: 3, name: 'J.R. "Bob" Dobbs', roles: ['DEVELOPER'], weekly_hours: 40 }
];