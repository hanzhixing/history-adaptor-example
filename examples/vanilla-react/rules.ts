import type {Rule} from 'history-adaptor/helper';

// Outer portal address -> nested address
export const rulesFromOuterToNested: Rule[] = [
    // literal replacement
    {from: '/portal/home', to: '/news'},
    {from: '/portal/error/not_found', to: '/404'},

    // path-to-regexp (>= 8.4.0): pass :param through
    {from: '/portal/discussion/:discussion_id', to: '/discussion/:discussion_id'},
    {from: '/portal/user/:user_id', to: '/user/:user_id'},

    // native RegExp + String.prototype.replace: query becomes path, $<name> groups
    {
        from: /^\/portal\/articles\?user_id=(?<user_id>[^&#]*)&category_id=(?<category_id>[^&#]*)&keyword=(?<keyword>[^&#]*)#(?<comments>[^#]*)$/,
        to: '/user/$<user_id>/post?category=$<category_id>&keyword=$<keyword>#$<comments>',
    },

    // RFC 6570 URI template: pathname + query + fragment
    {from: '/portal/friend{?user_id,group}{#hash}', to: '/user/{user_id}/friend{?group}{#hash}'},
];

// Nested address -> outer portal address
export const rulesFromNestedToOuter: Rule[] = [
    {from: '/news', to: '/portal/home'},
    {from: '/discussion/:discussion_id', to: '/portal/discussion/:discussion_id'},
    {from: '/user/:user_id', to: '/portal/user/:user_id'},
    {
        from: /^\/user\/(?<user_id>[^/?#]+)\/post\?category=(?<category_id>[^&#]*)&keyword=(?<keyword>[^&#]*)#(?<comments>[^#]*)$/,
        to: '/portal/articles?user_id=$<user_id>&category_id=$<category_id>&keyword=$<keyword>#$<comments>',
    },
    {from: '/user/{user_id}/friend{?group}{#hash}', to: '/portal/friend{?user_id,group}{#hash}'},
];
