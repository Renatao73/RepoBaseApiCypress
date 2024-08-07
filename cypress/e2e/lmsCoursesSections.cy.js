import { getToken, getUrlApi ,getTokenIvanlido} from '../support/helper';
import { setLmsID,setLmsIDDuplicate,setLmsIDCourse, setLmsIDNew, setLmsIDCourseDuplicate
    , getLmsId,getLmsIdSections,setLmsIDSections,
    getLmsIdCourseIDNew, getLmsIdDuplicate , getLmsIdCourse , getLmsIdCourseIDDuplicate, getLmsIdNew} from '../support/variables/lms';
describe('Validando Course sections', function () { 

 it('criando Lms Para Criar course ', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/create`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "title": "Anhanguera Interlagos"
            }
        }).then((response) => {
            setLmsIDCourse(response.body?.data?.lms?.id)
            expect(response.status).to.eq(200);
            expect(response.body.data.lms.created_at).not.be.empty;
            expect(response.body.data.lms.id).not.be.null;
            expect(response.body.data.lms.slug).not.be.empty;
            expect(response.body.data.lms.title).to.include('Anhanguera Interlagos');
            expect(response.body.data.lms.total_classes).not.be.null;
            expect(response.body.data.lms.total_courses).not.be.null;
            expect(response.body.data.lms.total_courses_active).not.be.null;
            expect(response.body.data.lms.updated_at).not.be.empty;
           
        })
    })
    
it('criando Lms courses ', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/${getLmsIdCourse()}/courses/create`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                
                    "file_id":  null,
                    "title": "Curso de Matematica",
                    "description": "Descrição do Curso",
                    "is_free": 1,
                    "coins": "0",
                    "price": "1000",
                    "registration_start": "12/01/2030 03:10:00",
                    "registration_end": "12/10/2030 03:10:00",
                    "course_end": "12/20/2030 03:10:00",
                    "order": 0,
                    "credit_coins": 0,
                        "card_home_enable": 1,
                        "show_title_card": 1,
                      "card_thumb_file_id": 6,
                      "card_thumb_hover_file_id" : 6,
                      "file_hover_id": 6
                
            }
        }).then((response) => {
            setLmsIDNew(response.body?.data?.courses?.id)
            expect(response.status).to.eq(200);
            
        })
    })

it('criando sections ', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/create`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": null,
                "title": "Section 01",
                "description": "Descrição da sessão.",
                "order": 0,
                "active": 1,
                "credit_coins": 100
                
            }
        }).then((response) => {  
           setLmsIDSections(response.body.data.courses.sections[0].id)       
            expect(response.status).to.eq(200);
            expect(response.body.data.courses.sections[0].active).not.be.null;
            expect(response.body.data.courses.sections[0].course_id).not.be.null;
            expect(response.body.data.courses.sections[0].created_at).not.be.empty;
            expect(response.body.data.courses.sections[0].credit_coins).not.be.null;
            expect(response.body.data.courses.sections[0].description).to.include('Descrição da sessão.');
            expect(response.body.data.courses.sections[0].id).not.be.null;
            expect(response.body.data.courses.sections[0].order).not.be.null;
            expect(response.body.data.courses.sections[0].slug).not.be.empty;
            expect(response.body.data.courses.sections[0].title).not.be.empty;
            expect(response.body.data.courses.sections[0].total_lessons).not.be.null;
            expect(response.body.data.courses.sections[0].updated_at).not.be.empty;
        })
    })

    it('Validando Retorno de lista ', () => {
        cy.request({
            method: 'GET',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
        }).then((response) => {
            expect(response.status).to.eq(200);  
            expect(response.body.data.sections.description).to.include('Descrição da sessão.');     
        })
    })

    it('editando sections ', () => {
        cy.request({
            method: 'PUT',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/update/${getLmsIdSections()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": null,
                "title": "Section 01",
                "description": "VR GLASS TESTE",
                "order": 0,
                "active": 1,
                "credit_coins": 100
                
            }
        }).then((response) => {  
            expect(response.status).to.eq(200);
            expect(response.body.data.sections.description).to.include('VR GLASS TESTE');
        })
    })

    it('Validando Retorno de lista do section editado ', () => {
        cy.request({
            method: 'GET',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
        }).then((response) => {
            expect(response.status).to.eq(200);  
            expect(response.body.data.sections.description).to.include('VR GLASS TESTE');     
        })
    })

    it('Deletando ', () => {
        cy.request({
            method: 'DELETE',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/delete/${getLmsIdSections()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
        }).then((response) => {
            expect(response.status).to.eq(200);  
        })
    })

    it('deletando lms Criado', () => {
        cy.request({
            method: 'DELETE',
            url: `${getUrlApi()}/lms/delete/${getLmsIdCourse()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200);
    
        })
    })
///////////////////////////////////////////// negativos ////////////////////////////////////////////////////////////////////////
    it('Deletando sections inexistente', () => {
        cy.request({
            method: 'DELETE',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/delete/${getLmsIdSections()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);  
        })
    })
    it('criando sections com token invalido ', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/create`,
            headers: {
                Authorization: getTokenIvanlido(),
                Accept: "application/json"
            },
            body: {
                "file_id": null,
                "title": "Section 01",
                "description": "Descrição da sessão.",
                "order": 0,
                "active": 1,
                "credit_coins": 100
                
            },
            failOnStatusCode: false
        }).then((response) => {    
            expect(response.status).to.eq(401);
        })
    })

    it('criando sections com informacao invalida', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/create`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_sssssid": null,
                "title": "Section 01",
                "description": "Descrição da sessão.",
                "order": 0,
                "active": 1,
                "credit_coins": 100
                
            },
            failOnStatusCode: false
        }).then((response) => {  
            expect(response.status).to.eq(400);
        
        })
    })

    it('editando sections com informacao invalida', () => {
        cy.request({
            method: 'PUT',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/update/${getLmsIdSections()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "fiadsale_id": null,
                "titlasdase": "Section 01",
                "desasdascription": "VR GLASS TESTE",
                "ordasdaser": 0,
                "active": 1,
                "creasdadit_coins": 100
                
            },
            failOnStatusCode: false
        }).then((response) => {  
            expect(response.status).to.eq(422);
        
        })
    })

    it('Validando Retorno de lista sections deletado ', () => {
        cy.request({
            method: 'GET',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);     
        })
    })
    it('criando sections com dados vazios', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/create`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": null,
                "title": "Section 01",
                "description": "",
                "order": 0,
                "active": 1,
                "credit_coins": 100
                
            },
            failOnStatusCode: false
        }).then((response) => {     
            expect(response.status).to.eq(400);
        })
    })

    it('editando sections vazios ', () => {
        cy.request({
            method: 'PUT',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/update/${getLmsIdSections()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": null,
                "title": "Section 01",
                "description": "",
                "order": 0,
                "active": 1,
                "credit_coins": 100
                
            },
            failOnStatusCode: false
        }).then((response) => {     
            expect(response.status).to.eq(400);
        })
    })

    it('Validando Retorno de lista sections inexistente', () => {
        cy.request({
            method: 'GET',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/119198919856`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);     
        })
    })
})