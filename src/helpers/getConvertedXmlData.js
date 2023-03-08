const { XMLParser } = require('fast-xml-parser');

const parser = new XMLParser({
    numberParseOptions: {
        leadingZeros: false
    },
    isArray: (tagName) => {
        return !!['address', 'document'].includes(tagName);
    }
});

const getConvertedXmlData = (responseXmlData) => {
    const convertedResponseObject = parser.parse(responseXmlData);
    const convertedResponseBody =
        convertedResponseObject['soap:Envelope']['soap:Body']['ns2:getPersonResponse'].return[
            'ns3:Person'
        ];

    const responseStatusCode = convertedResponseBody?.responseInfo?.status?.code || '';
    const responseMessage = convertedResponseBody?.responseInfo?.status?.message || '';
    const errorList = ['SBF-VE-8', 'VAL-JSR-001', 'SBF-AD-1', 'FAULT-015', 'VAL-R-004', 'SCSE001'];

    if (errorList.includes(responseStatusCode)) {
        return {
            success: false,
            message: responseMessage,
            statusCode: responseStatusCode,
            person: null
        };
    }

    const responsePerson = Array.isArray(convertedResponseBody.responseData.data.persons.person)
        ? convertedResponseBody.responseData.data.persons.person[0]
        : convertedResponseBody.responseData.data.persons.person;

    return {
        success: true,
        message: responseMessage,
        statusCode: responseStatusCode,
        person: {
            iin: responsePerson?.iin?.toString() || '',
            surname: responsePerson?.surname?.toString() || '',
            name: responsePerson?.name?.toString() || '',
            patronymic: responsePerson?.patronymic?.toString() || '',
            engFirstName: responsePerson?.engFirstName?.toString() || '',
            Surname: responsePerson?.Surname?.toString() || '',
            birthDate: responsePerson?.birthDate?.toString() || '',
            deathDate: responsePerson?.deathDate?.toString() || '',
            gender: {
                code: responsePerson?.gender?.code?.toString() || '',
                nameRu: responsePerson?.gender?.nameRu?.toString() || '',
                nameKz: responsePerson?.gender?.nameKz?.toString() || '',
                changeDate: responsePerson?.gender?.changeDate?.toString() || ''
            },
            nationality: {
                code: responsePerson?.nationality?.code?.toString() || '',
                nameRu: responsePerson?.nationality?.nameRu?.toString() || '',
                nameKz: responsePerson?.nationality?.nameKz?.toString() || '',
                changeDate: responsePerson?.nationality?.changeDate?.toString() || ''
            },
            citizenship: {
                code: responsePerson?.citizenship?.code?.toString() || '',
                nameRu: responsePerson?.citizenship?.nameRu?.toString() || '',
                nameKz: responsePerson?.citizenship?.nameKz?.toString() || '',
                changeDate: responsePerson?.citizenship?.changeDate?.toString() || ''
            },
            lifeStatus: {
                code: responsePerson?.lifeStatus?.code?.toString() || '',
                nameRu: responsePerson?.lifeStatus?.nameRu?.toString() || '',
                nameKz: responsePerson?.lifeStatus?.nameKz?.toString() || '',
                changeDate: responsePerson?.lifeStatus?.changeDate?.toString() || ''
            },
            birthCertificate: {
                number: responsePerson?.birthCertificate?.number?.toString() || '',
                beginDate: responsePerson?.birthCertificate?.beginDate?.toString() || '',
                issueOrganisation:
                    responsePerson?.birthCertificate?.issueOrganisation?.toString() || ''
            },
            deathCertificate: {
                number: responsePerson?.deathCertificate?.number?.toString() || '',
                beginDate: responsePerson?.deathCertificate?.beginDate?.toString() || '',
                issueOrganisation:
                    responsePerson?.deathCertificate?.issueOrganisation?.toString() || ''
            },
            birthPlace: {
                country: {
                    code: responsePerson?.birthPlace?.country?.code?.toString() || '',
                    nameRu: responsePerson?.birthPlace?.country?.nameRu?.toString() || '',
                    nameKz: responsePerson?.birthPlace?.country?.nameKz?.toString() || '',
                    changeDate: responsePerson?.birthPlace?.country?.changeDate?.toString() || ''
                },
                district: {
                    code: responsePerson?.birthPlace?.district?.code?.toString() || '',
                    nameRu: responsePerson?.birthPlace?.district?.nameRu?.toString() || '',
                    nameKz: responsePerson?.birthPlace?.district?.nameKz?.toString() || '',
                    changeDate: responsePerson?.birthPlace?.district?.changeDate?.toString() || ''
                },
                region: {
                    code: responsePerson?.birthPlace?.region?.code?.toString() || '',
                    nameRu: responsePerson?.birthPlace?.region?.nameRu?.toString() || '',
                    nameKz: responsePerson?.birthPlace?.region?.nameKz?.toString() || '',
                    changeDate: responsePerson?.birthPlace?.region?.changeDate?.toString() || ''
                },
                foreignData: {
                    districtName:
                        responsePerson?.birthPlace?.foreignData?.districtName?.toString() || '',
                    regionName:
                        responsePerson?.birthPlace?.foreignData?.regionName?.toString() || ''
                },
                city: responsePerson?.birthPlace?.city?.toString() || '',
                birthTeCodeAR: responsePerson?.birthPlace?.birthTeCodeAR?.toString() || ''
            },
            regAddress: {
                country: {
                    code: responsePerson?.regAddress?.country?.code?.toString() || '',
                    nameRu: responsePerson?.regAddress?.country?.nameRu?.toString() || '',
                    nameKz: responsePerson?.regAddress?.country?.nameKz?.toString() || '',
                    changeDate: responsePerson?.regAddress?.country?.changeDate?.toString() || ''
                },
                district: {
                    code: responsePerson?.regAddress?.district?.code?.toString() || '',
                    nameRu: responsePerson?.regAddress?.district?.nameRu?.toString() || '',
                    nameKz: responsePerson?.regAddress?.district?.nameKz?.toString() || '',
                    changeDate: responsePerson?.regAddress?.district?.changeDate?.toString() || ''
                },
                region: {
                    code: responsePerson?.regAddress?.region?.code?.toString() || '',
                    nameRu: responsePerson?.regAddress?.region?.nameRu?.toString() || '',
                    nameKz: responsePerson?.regAddress?.region?.nameKz?.toString() || '',
                    changeDate: responsePerson?.regAddress?.region?.changeDate?.toString() || ''
                },
                foreignData: {
                    districtName:
                        responsePerson?.regAddress?.foreignData?.districtName?.toString() || '',
                    regionName:
                        responsePerson?.regAddress?.foreignData?.regionName?.toString() || ''
                },
                city: responsePerson?.regAddress?.city?.toString() || '',
                street: responsePerson?.regAddress?.street?.toString() || '',
                building: responsePerson?.regAddress?.building?.toString() || '',
                corpus: responsePerson?.regAddress?.corpus?.toString() || '',
                flat: responsePerson?.regAddress?.flat?.toString() || '',
                beginDate: responsePerson?.regAddress?.beginDate?.toString() || '',
                endDate: responsePerson?.regAddress?.endDate?.toString() || '',
                status: {
                    code: responsePerson?.regAddress?.status?.code?.toString() || '',
                    nameRu: responsePerson?.regAddress?.status?.nameRu?.toString() || '',
                    nameKz: responsePerson?.regAddress?.status?.nameKz?.toString() || '',
                    changeDate: responsePerson?.regAddress?.status?.changeDate?.toString() || ''
                },
                invalidity: {
                    code: responsePerson?.regAddress?.invalidity?.code?.toString() || '',
                    nameRu: responsePerson?.regAddress?.invalidity?.nameRu?.toString() || '',
                    nameKz: responsePerson?.regAddress?.invalidity?.nameKz?.toString() || '',
                    changeDate: responsePerson?.regAddress?.invalidity?.changeDate?.toString() || ''
                },
                arCode: responsePerson?.regAddress?.arCode?.toString() || ''
            },
            personCapableStatus: {
                capableStatus: {
                    code:
                        responsePerson?.personCapableStatus?.capableStatus?.code?.toString() || '',
                    nameRu:
                        responsePerson?.personCapableStatus?.capableStatus?.nameRu?.toString() ||
                        '',
                    nameKz:
                        responsePerson?.personCapableStatus?.capableStatus?.nameKz?.toString() ||
                        '',
                    changeDate:
                        responsePerson?.personCapableStatus?.capableStatus?.changeDate?.toString() ||
                        ''
                },
                capableDate: responsePerson?.personCapableStatus?.capableDate?.toString() || '',
                capableEndDate:
                    responsePerson?.personCapableStatus?.capableEndDate?.toString() || '',
                capableNumber: responsePerson?.personCapableStatus?.capableNumber?.toString() || '',
                court: {
                    code: responsePerson?.personCapableStatus?.court?.code?.toString() || '',
                    nameRu: responsePerson?.personCapableStatus?.court?.nameRu?.toString() || '',
                    nameKz: responsePerson?.personCapableStatus?.court?.nameKz?.toString() || '',
                    changeDate:
                        responsePerson?.personCapableStatus?.court?.changeDate?.toString() || ''
                }
            },
            missingStatus: {
                missing: responsePerson?.missingStatus?.missing?.toString() || '',
                missingDate: responsePerson?.missingStatus?.missingDate?.toString() || '',
                missingEndDate: responsePerson?.missingStatus?.missingEndDate?.toString() || '',
                missingNumber: responsePerson?.missingStatus?.missingNumber?.toString() || '',
                gpTerritorial: {
                    code: responsePerson?.missingStatus?.gpTerritorial?.code?.toString() || '',
                    nameRu: responsePerson?.missingStatus?.gpTerritorial?.nameRu?.toString() || '',
                    nameKz: responsePerson?.missingStatus?.gpTerritorial?.nameKz?.toString() || '',
                    changeDate:
                        responsePerson?.missingStatus?.gpTerritorial?.changeDate?.toString() || ''
                }
            },
            disappearStatus: {
                disappear: responsePerson?.disappearStatus?.disappear?.toString() || '',
                disappearDate: responsePerson?.disappearStatus?.disappearDate?.toString() || '',
                disappearEndDate:
                    responsePerson?.disappearStatus?.disappearEndDate?.toString() || '',
                disappearNumber: responsePerson?.disappearStatus?.disappearNumber?.toString() || '',
                gpTerritorial: {
                    code: responsePerson?.disappearStatus?.gpTerritorial?.code?.toString() || '',
                    nameRu:
                        responsePerson?.disappearStatus?.gpTerritorial?.nameRu?.toString() || '',
                    nameKz:
                        responsePerson?.disappearStatus?.gpTerritorial?.nameKz?.toString() || '',
                    changeDate:
                        responsePerson?.disappearStatus?.gpTerritorial?.changeDate?.toString() || ''
                }
            },
            excludeStatus: {
                excludeReason: {
                    code: responsePerson?.excludeStatus?.excludeReason?.code?.toString() || '',
                    nameRu: responsePerson?.excludeStatus?.excludeReason?.nameRu?.toString() || '',
                    nameKz: responsePerson?.excludeStatus?.excludeReason?.nameKz?.toString() || '',
                    changeDate:
                        responsePerson?.excludeStatus?.excludeReason?.changeDate?.toString() || ''
                },
                excludeReasonDate: {
                    code: responsePerson?.excludeStatus?.excludeReasonDate?.code?.toString() || '',
                    nameRu:
                        responsePerson?.excludeStatus?.excludeReasonDate?.nameRu?.toString() || '',
                    nameKz:
                        responsePerson?.excludeStatus?.excludeReasonDate?.nameKz?.toString() || '',
                    changeDate:
                        responsePerson?.excludeStatus?.excludeReasonDate?.changeDate?.toString() ||
                        ''
                },
                excludeDate: responsePerson?.excludeStatus?.excludeDate?.toString() || '',
                excludeParticipant: {
                    code: responsePerson?.excludeStatus?.excludeParticipant?.code?.toString() || '',
                    nameRu:
                        responsePerson?.excludeStatus?.excludeParticipant?.nameRu?.toString() || '',
                    nameKz:
                        responsePerson?.excludeStatus?.excludeParticipant?.nameKz?.toString() || '',
                    changeDate:
                        responsePerson?.excludeStatus?.excludeParticipant?.changeDate?.toString() ||
                        ''
                }
            },
            repatriationStatus: {
                repatriationStatus:
                    responsePerson?.repatriationStatus?.repatriationStatus?.toString() || '',
                repatriationDate:
                    responsePerson?.repatriationStatus?.repatriationDate?.toString() || '',
                repatriationEndDate:
                    responsePerson?.repatriationStatus?.repatriationEndDate?.toString() || '',
                repatriationNumber:
                    responsePerson?.repatriationStatus?.repatriationNumber?.toString() || '',
                repatriationOrg:
                    responsePerson?.repatriationStatus?.repatriationOrg?.toString() || '',
                repatriationReason:
                    responsePerson?.repatriationStatus?.repatriationReason?.toString() || ''
            },
            documents:
                responsePerson?.documents?.document?.map((doc) => {
                    return {
                        type: {
                            code: doc?.type?.code?.toString() || '',
                            nameRu: doc?.type?.nameRu?.toString() || '',
                            nameKz: doc?.type?.nameKz?.toString() || '',
                            changeDate: doc?.type?.changeDate?.toString() || ''
                        },
                        number: doc?.number?.toString() || '',
                        series: doc?.series?.toString() || '',
                        beginDate: doc?.beginDate?.toString() || '',
                        endDate: doc?.endDate?.toString() || '',
                        issueOrganization: {
                            code: doc?.issueOrganization?.code.toString() || '',
                            nameRu: doc?.issueOrganization?.nameRu?.toString() || '',
                            nameKz: doc?.issueOrganization?.nameKz?.toString() || '',
                            changeDate: doc?.issueOrganization?.changeDate?.toString() || ''
                        },
                        status: {
                            code: doc?.status?.code?.toString() || '',
                            nameRu: doc?.status?.nameRu?.toString() || '',
                            nameKz: doc?.status?.nameKz?.toString() || '',
                            changeDate: doc?.status?.changeDate?.toString() || ''
                        },
                        invalidityDate: doc?.invalidityDate?.toString() || '',
                        surname: doc?.surname?.toString() || '',
                        name: doc?.name?.toString() || '',
                        patronymic: doc?.patronymic?.toString() || '',
                        birthDate: doc?.birthDate?.toString() || ''
                    };
                }) || [],
            addresses:
                responsePerson?.addresses?.address?.map((add) => {
                    return {
                        type: {
                            code: add?.type?.code?.toString() || '',
                            nameRu: add?.type?.nameRu?.toString() || '',
                            nameKz: add?.type?.nameKz?.toString() || '',
                            changeDate: add?.type?.changeDate?.toString() || ''
                        },
                        country: {
                            code: add?.country?.code?.toString() || '',
                            nameRu: add?.country?.nameRu?.toString() || '',
                            nameKz: add?.country?.nameKz?.toString() || '',
                            changeDate: add?.country?.changeDate?.toString() || ''
                        },
                        district: {
                            code: add?.district?.code?.toString() || '',
                            nameRu: add?.district?.nameRu?.toString() || '',
                            nameKz: add?.district?.nameKz?.toString() || '',
                            changeDate: add?.district?.changeDate?.toString() || ''
                        },
                        region: {
                            code: add?.region?.code?.toString() || '',
                            nameRu: add?.region?.nameRu?.toString() || '',
                            nameKz: add?.region?.nameKz?.toString() || '',
                            changeDate: add?.region?.changeDate?.toString() || ''
                        },
                        city: add?.city?.toString() || '',
                        street: add?.street?.toString() || '',
                        building: add?.building?.toString() || '',
                        corpus: add?.corpus?.toString() || '',
                        flat: add?.flat?.toString() || '',
                        beginDate: add?.beginDate?.toString() || '',
                        endDate: add?.endDate?.toString() || '',
                        arCode: add?.arCode?.toString() || ''
                    };
                }) || [],
            removed: responsePerson.removed?.toString() || ''
        }
    };
};

module.exports.getConvertedXmlData = getConvertedXmlData;
