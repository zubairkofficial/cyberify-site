const Achievement = ({achievement}) => {
    return (
        <div className="col-md-6 col-xl-4">
            <div className="mil-icon-box-2 mil-mb-60">
                <div className="mil-box-text">
                    <h4 className="mil-mb-30">{achievement.name}</h4>
                    <p className="mil-box-text mil-mb-30">{ achievement.description }</p>
                </div>
            </div>
        </div>
    )
}

const CaseConclusions = ({ achievements = [] }) => {
    return (
        <section className="mil-p-120-60">
            <div className="mil-deco" style={{ top: 0, left: '30%' }}></div>
            <div className="container">
                <div className="row align-items-end mil-mb-90">
                    <div className="col-xl-6">
                        <h3 className="mil-mb-30">Conclusion</h3>
                        <p>We achieved significant insights and growth, learning the value of adaptability and tailored strategies for successful, compliant solutions. Our achievements include</p>
                    </div>
                </div>

                <div className="row">
                    {achievements.map(achievement => <Achievement key={achievement.id} achievement={achievement} />)}
                </div>
            </div>
        </section>
    )
}

export default CaseConclusions;