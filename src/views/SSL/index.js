import { gql, useSubscription, useQuery, useMutation } from "@apollo/client";

import SSLBoard from '../../components/SSLBoard';

function SSL() {
    const LIST_DOMAINS = gql`
        query listSSLExpirationHosts {
            listSSLExpirationHosts {
                items {
                    host
                    expiration
                }
            }
        }
    `;

    const {
        loading: listLoading,
        data: listData,
    } = useQuery(LIST_DOMAINS);


    const CREATE_DOMAIN = gql`
    mutation CreateDomain($input: CreateSSLExpirationHostsInput!) {
        createSSLExpirationHosts(input: $input) {
            host
            expiration
        }
    }
    `;

    const [addDomainMutateFunction, { loading: addDomainLoading }] =
        useMutation(CREATE_DOMAIN);

    async function addDomain(host) {
        try {
            for(let i = 0; i < listData.listSSLExpirationHosts.items.length; i++) {
                if(listData.listSSLExpirationHosts.items[i].host === host) {
                    return;
                }
            }

            addDomainMutateFunction({ variables: { input: { host } } });
        } catch (err) {
            console.log("error creating domain: ", err);
        }
    }

    const DELETE_DOMAIN = gql`
        mutation DeleteDomain($input: DeleteSSLExpirationHostsInput!) {
            deleteSSLExpirationHosts(input: $input) {
                host
                expiration
            }
        }
    `;

    const [deleteDomainMutateFunction, { loading: removeDomainLoading }] = useMutation(DELETE_DOMAIN, {
        refetchQueries: [LIST_DOMAINS, "listSSLExpirationHosts"],
    });

    async function removeDomain(host) {
        try {
            deleteDomainMutateFunction({ variables: { input: { host } } });
        } catch (err) {
            console.log("error deleting domain: ", err);
        }
    }

    const CREATE_DOMAIN_SUBSCRIPTION = gql`
        subscription OnCreateDomain {
            onCreateSSLExpirationHosts {
                host
                expiration
            }
        }
    `;

    useSubscription(
        CREATE_DOMAIN_SUBSCRIPTION,
        {
            onSubscriptionData: ({ client, subscriptionData: { data } }) => {
                if (!data) return;

                const current = client.readQuery({ query: LIST_DOMAINS });
                client.writeQuery({
                    query: LIST_DOMAINS,
                    data: {
                        ...current,
                        listSSLExpirationHosts: {
                            ...current.listSSLExpirationHosts,
                            items: [
                                ...current.listSSLExpirationHosts.items,
                                data.onCreateSSLExpirationHosts
                            ],
                        }
                    },
                })
            },
        }
    );

    const DELETE_DOMAIN_SUBSCRIPTION = gql`
        subscription OnDeleteDomain {
            onDeleteSSLExpirationHosts {
                host
                expiration
            }
        }
    `;

    useSubscription(
        DELETE_DOMAIN_SUBSCRIPTION,
        {
            onSubscriptionData: ({ client, subscriptionData: { data } }) => {
                if (!data) return;

                const current = client.readQuery({ query: LIST_DOMAINS });
                const removedHost = data.onDeleteSSLExpirationHosts.host;

                client.writeQuery({
                    query: LIST_DOMAINS,
                    data: {
                        ...current,
                        listSSLExpirationHosts: {
                            ...current.listSSLExpirationHosts,
                            items: current.listSSLExpirationHosts.items.filter(domain => domain.host !== removedHost)
                        }
                    },
                })
            },
            refetchQueries: [LIST_DOMAINS, "listSSLExpirationHosts"]
        }
    );
    
    const UPDATE_DOMAIN_SUBSCRIPTION = gql`
        subscription OnUpdateDomain {
            onUpdateSSLExpirationHosts {
                host
                expiration
            }
        }
    `;

    useSubscription(
        UPDATE_DOMAIN_SUBSCRIPTION,
        {
            onSubscriptionData: ({ client, subscriptionData: { data } }) => {
                if (!data) return;

                const current = client.readQuery({ query: LIST_DOMAINS });

                const updatedHost = data.onUpdateSSLExpirationHosts;
                const newItems = [...current.listSSLExpirationHosts.items.map(item => item.host === updatedHost.host ? updatedHost : item)];

                client.writeQuery({
                    query: LIST_DOMAINS,
                    data: {
                        ...current,
                        listSSLExpirationHosts: {
                            ...current.listSSLExpirationHosts,
                            items: newItems
                        }
                    },
                })
            },
            refetchQueries: [LIST_DOMAINS, "listSSLExpirationHosts"]
        }
    );

    return (
        <SSLBoard
            loading={listLoading}
            domains={listData?.listSSLExpirationHosts?.items || []}

            addDomainLoading={addDomainLoading}
            addDomain={addDomain}

            removeDomainLoading={removeDomainLoading}
            removeDomain={removeDomain}
        />
    );
}

export default SSL;