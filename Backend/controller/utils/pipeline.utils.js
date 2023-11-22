const getProjectObj = (type, type2 = 'sent') => {
    switch (type) {
        case 'project':
            return {
                id: '$_id',
                user: {
                    id: '$user._id',
                    name: '$user.name',
                    message: type2 == 'sent' ? '$to.message' : '$from.message',
                },
                message_by_sender: type2 == 'sent' ? '$from.message' : '',
                groupDetails: {
                    id: '$group._id',
                    groupNo: '$group.groupNumber',
                },
                problemStatementDetails: {
                    id: '$problemStatement._id',
                    statement: '$problemStatement.statement',
                    title: '$problemStatement.title',
                },
                _id: 0,
                status: 1,
                createdAt: 1,
                type: 1,
            }

        case 'group':
            return {
                id: '$_id',
                user: {
                    id: '$user._id',
                    name: '$user.name',
                },
                groupDetails: {
                    id: '$group._id',
                    groupNo: '$group.groupNumber',
                },
                type: 1,
                status: 1,
                createdAt: 1,
                _id: 0,
            }

        case 'customProject':
            return {
                id: '$_id',
                user: {
                    id: '$user._id',
                    name: '$user.name',
                    message: type2 == 'sent' ? '$to.message' : '$from.message',
                },
                groupDetails: {
                    id: '$group._id',
                    groupNo: '$group.groupNumber',
                },
                problemStatementDetails: {
                    statement: '$projectDescription',
                    domain: '$projectDomain',
                    title: '$projectTitle',
                },
                type: 1,
                status: 1,
                createdAt: 1,
                _id: 0,
            }

        default:
            return {}
    }
}

const getUserLookUp = (localField) => {
    return [
        {
            $lookup: {
                from: 'users',
                localField: localField,
                foreignField: '_id',
                as: 'user',
            },
        },
        {
            $unwind: {
                path: '$user',
                preserveNullAndEmptyArrays: true,
            },
        },
    ]
}

module.exports = {
    getProjectObj,
    getUserLookUp
}

