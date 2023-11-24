import { getCookie } from "./cookie_finder.js"

function handle_members(event) {
  console.log('DOM fully loaded and parsed');
  const resultsDiv = document.getElementById('results-div');
  const restOpsDiv = document.getElementById('rest-ops');
  const listMembersButton = document.getElementById('list-members');
  const createMemberButton = document.getElementById('create-member');
  const firstName = document.getElementById('member-firstName');
  const lastName = document.getElementById('member-lastName');
  const updateMemberButton = document.getElementById('update-member');
  const memberID = document.getElementById('member-id');
  const firstName1 = document.getElementById('member-firstName1');
  const lastName1 = document.getElementById('member-lastName1');
  const members_path = '/api/v1/members';

  restOpsDiv.addEventListener('click', (event) => {
    if (event.target === listMembersButton) {
      fetch(members_path)
        .then((response) => {
        if (response.status === 200) {
          resultsDiv.innerHTML = '';
          response.json().then((data) => {
            let parag = document.createElement('P');
            parag.textContent = JSON.stringify(data);
            resultsDiv.appendChild(parag);
          });
        } else {
          alert(`Return code ${response.status} ${response.statusText}`);
        }
      }).catch((error) => {
        console.log(error);
        alert(error);
      });
    } else if (event.target === createMemberButton) {
      var dataObject = {
        first_name: firstName.value,
        last_name: lastName.value
      }
      let headers = {'Content-Type': 'application/json'};
      let csrf_cookie = getCookie("CSRF-TOKEN");
      if (csrf_cookie) {
        headers['X-CSRF-Token'] =  csrf_cookie;
      }
      fetch(members_path,
        { method: 'POST',
          headers: headers,
          body: JSON.stringify(dataObject)
        }
      ).then((response) => {
        if (response.status === 201) {
          response.json().then((data) => {
            resultsDiv.innerHTML = '';
            let parag = document.createElement('P');
            parag.textContent = JSON.stringify(data);
            resultsDiv.appendChild(parag);
          });
        } else {
          response.json().then((data) => {
            alert(`Return code ${response.status} ${response.statusText} ${JSON.stringify(data)}`);
          }).catch((error) => {
            console.log(error);
            alert(error);
          });
        }
      });
    } else if (event.target === updateMemberButton) {
      var dataObject = {
        first_name: firstName1.value,
        last_name: lastName1.value
      }
      let headers = {'Content-Type': 'application/json'};
      let csrf_cookie = getCookie("CSRF-TOKEN");
      if (csrf_cookie) {
        headers['X-CSRF-Token'] =  csrf_cookie;
      }
      fetch(`${members_path}/${memberID.value}`,
        { method: 'PUT',
          headers: headers,
          body: JSON.stringify(dataObject)
        }
      ).then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            resultsDiv.innerHTML = '';
            let parag = document.createElement('P');
            parag.textContent = JSON.stringify(data);
            resultsDiv.appendChild(parag);
          });
        } else {
          response.json().then((data) => {
            alert(`Return code ${response.status} ${response.statusText} ${JSON.stringify(data)}`);
          }).catch((error) => {
            console.log(error);
            alert(error);
          });
        }
      });
    }
  });
}
document.addEventListener('DOMContentLoaded', handle_members(event));
