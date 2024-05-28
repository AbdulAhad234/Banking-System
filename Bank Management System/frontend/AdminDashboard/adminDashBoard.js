function showTabContent(tabId) {
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.style.display = 'none');
    document.getElementById(tabId).style.display = 'block';
}

function showStaffSection(sectionId) {
    const sections = document.querySelectorAll('.staff-section');
    sections.forEach(section => section.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';

    if (sectionId === 'viewStaff' || sectionId === 'deleteStaff') {
        fetchStaff(sectionId);
    }
}