import React from 'react';

import './style.scss';
import './media.scss';

const AboutTeamPage = () => (
 <div className = "teamWrapper">
     <div className = "person first-person">
         <div className = "person-column text">
             <h4>Станислав Кирсанов</h4>
             <ul>
                 <li>Ментор</li>
                 <li>Software Engineer at EPAM</li>
                 <li>Консультация по различным вопросам, связанным с архитектурой и реализацией приложения</li>
                 <li>Код-ревью</li>
             </ul>
         </div>
         <div className = "person-column photo">
             <div className = "person-photo first-photo"></div>
         </div>
         <div className = "person-column empty"></div>
     </div>
     <div className = "person second-person">
         <div className = "person-column empty"></div>
         <div className = "person-column photo">
            <div className = "person-photo second-photo"></div>
         </div>
         <div className = "person-column text">
            <h4>Алексей Курбатов</h4>
             <ul>
                 <li>Team-lead</li>
                 <li>Архитектура приложения</li>
                 <li>Реализация механизма авторизации пользователя для всего приложения</li>
                 <li>Реализация компонента для авторизации и регистрации в приложении</li>
                 <li>Мини-игра SpeakIt</li>
                 <li>Код-ревью</li>
             </ul>
         </div>
     </div>
     <div className = "person third-person">
         <div className = "person-column text">
            <h4>Александр Бородич</h4>
            <ul>
                 <li>Мини-игра Аудиовызов</li>
             </ul>
         </div>
         <div className = "person-column photo">
            <div className = "person-photo third-photo"></div>
         </div>
         <div className = "person-column empty"></div>
     </div>
     <div className = "person fourth-person">
         <div className = "person-column empty"></div>
         <div className = "person-column photo">
            <div className = "person-photo fourth-photo"></div>
         </div>
         <div className = "person-column text">
            <h4>Виктория Каморина</h4>
                <ul>
                    <li>Мини-игра Спринт</li>
                    <li>Стилизация приложения</li>
                </ul>
         </div>
     </div>
     <div className = "person fifth-person">
         <div className = "person-column text">
            <h4>Максим Липлянин</h4>
                <ul>
                    <li>Мини-игра Саванна</li>
                    <li>Мини-игра English-puzzle</li>
                </ul>
         </div>
         <div className = "person-column photo">
            <div className = "person-photo fifth-photo"></div>
         </div>
         <div className = "person-column empty"></div>
     </div>
     <div className = "person sixth-person">
        <div className = "person-column empty"></div>
         <div className = "person-column photo">
            <div className = "person-photo sixth-photo"></div>
         </div>
         <div className = "person-column text">
            <h4>Марина Попроцкая</h4>
                <ul>
                    <li>Реализация компонента "Статистика"</li>
                    <li>Реализация компонента "Настройки"</li>
                    <li>Страница "О команде"</li>
                    <li>Главная страница</li>
                    <li>Реализация вспомогательных функций для обновления уровня сложности в играх и для обновления user words</li>
                </ul>
         </div>
     </div>
     <div className = "person seventh-person">
         <div className = "person-column text">
         <h4>Станислав Новиков</h4>
                <ul>
                    <li>Реализация основного приложения - карточки для изучения слов</li>
                    <li>Архитектура приложения</li>
                </ul>
         </div>
         <div className = "person-column photo">
            <div className = "person-photo seventh-photo"></div>
         </div>
         <div className = "person-column empty"></div>
     </div>
     <div className = "person eighth-person">
         <div className = "person-column empty"></div>
         <div className = "person-column photo">
            <div className = "person-photo eighth-photo"></div>
         </div>
         <div className = "person-column text">
            <h4>Агния Старовойтова</h4>
                <ul>
                    <li>Реализация компонента "Словарь"</li>
                    <li>Создание промо-страницы</li>
                    <li>Стилизация приложения</li>
                    <li>Создание бокового меню</li>
                </ul>
         </div>
     </div>
 </div>
);

export default AboutTeamPage;
