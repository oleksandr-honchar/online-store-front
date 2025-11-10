
import styles from './StyleFeatures.module.css';
import React from 'react'; 

interface Advantage {
  icon: string; 
  title: string;
  description: string;
}

export default function StyleFeatures(): React.JSX.Element { 
  
  const advantages: Advantage[] = [
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
      <div className={styles.container}>
        <h2 className={styles.title}>Обери свій унікальний стиль сьогодні!</h2> 
        {}
        <ul className={styles.advantagesList}>
          {advantages.map((advantage: Advantage, index: number) => ( 
            <li key={index} className={styles.advantageItem}>
              <div className={styles.iconContainer}>
                <span className={styles.icon}>{advantage.icon}</span> 
              </div>
              
              <h3 className={styles.advantageTitle}>{advantage.title}</h3>
              
              <p className={styles.advantageDescription}>{advantage.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}