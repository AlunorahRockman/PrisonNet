import React from 'react'
import "./nouvellePassPage.css"

function NouvellePassPage() {
  return (
    <div className='corpValidation'>
        <div className="coucheValidationNouvelle">
            <h1>Nouveau mot de passe</h1>
            <form>
                <div class="input-groupOublie">
                    <label for="nouveau">Entrer le nouveau mot de passe</label>
                    <input type="password" id="nouveau" name="nouveau"/>
                    <label className='labelNouvelle' for="confirm">Veuillez le confirmer</label>
                    <input type="password" id="confirm" name="confirm"/>
                </div>
                <hr className='hr'/>
                <button type="submit" class="btnValidation">Enregistrer</button>
            </form>
        </div>
    </div>
  )
}

export default NouvellePassPage