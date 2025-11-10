
import styles from './Style.module.css';

export default function Style() {
  const advantages = [
    {
      icon: '💧', 
      title: 'Якість та натуральність',
      description: 'Тільки пряжа та лід преміум, які зберігають форму навіть після десятків прань.',
    },
    {
      icon: '🎨',
      title: 'Універсальний дизайн',
      description: 'Багато кольорів та лаконічний стиль, що легко комбінується між собою.',
    },
    {
      icon: '👕',
      title: 'Комфорт на кожен день',
      description: 'Ідеал, який не обмежує рухів і підходить для будь-якої ситуації.',
    },
  ];

  return (
    <section className={styles.style}>
      {/* Додано div для центрування та обмеження ширини (styles.container),
          аналогічно коду іншого студента */}
      <div className={styles.container}>
        {/* header-block та h2 об'єднано в styles.title */}
        <h2 className={styles.title}>Обери свій унікальний стиль сьогодні!</h2>
        
        {/* features-container -> ul (styles.advantagesList) */}
        <ul className={styles.advantagesList}>
          {advantages.map((advantage, index) => (
            // feature-item -> li (styles.advantageItem)
            <li key={index} className={styles.advantageItem}>
              {/* icon-placeholder -> styles.iconContainer */}
              <div className={styles.iconContainer}>
                {/* Використовуємо символ як іконку */}
                <span className={styles.icon}>{advantage.icon}</span> 
              </div>
              
              {/* h3 -> styles.advantageTitle */}
              <h3 className={styles.advantageTitle}>{advantage.title}</h3>
              
              {/* p -> styles.advantageDescription */}
              <p className={styles.advantageDescription}>{advantage.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}