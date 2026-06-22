let chart = null;

function calculateRetirement() {
    // Get form values
    const currentAge = parseInt(document.getElementById('currentAge').value);
    const retirementAge = parseInt(document.getElementById('retirementAge').value);
    const currentSavings = parseFloat(document.getElementById('currentSavings').value);
    const annualIncome = parseFloat(document.getElementById('annualIncome').value);
    const savingsRate = parseFloat(document.getElementById('savingsRate').value) / 100;
    const expectedReturn = parseFloat(document.getElementById('expectedReturn').value) / 100;
    const inflation = parseFloat(document.getElementById('inflation').value) / 100;

    // Validation
    if (retirementAge <= currentAge) {
        alert('Retirement age must be greater than current age');
        return;
    }

    if (savingsRate < 0 || savingsRate > 1) {
        alert('Savings rate must be between 0% and 100%');
        return;
    }

    // Calculate years to retirement
    const yearsToRetirement = retirementAge - currentAge;
    const annualContribution = annualIncome * savingsRate;

    // Project savings year by year
    const projections = [];
    let balance = currentSavings;
    let totalContributed = currentSavings;
    let adjustedAnnualContribution = annualContribution;

    for (let year = 0; year <= yearsToRetirement; year++) {
        const age = currentAge + year;
        
        // Calculate investment gains on current balance
        const investmentGains = balance * expectedReturn;
        
        // Update balance
        balance = balance + investmentGains + adjustedAnnualContribution;
        
        // Track total contributions (excluding initial savings)
        if (year > 0) {
            totalContributed += adjustedAnnualContribution;
        }

        // Store projection data
        projections.push({
            age: age,
            year: year,
            contribution: adjustedAnnualContribution,
            gains: investmentGains,
            balance: balance
        });

        // Adjust contribution for inflation
        adjustedAnnualContribution *= (1 + inflation);
    }

    // Get final balance
    const finalBalance = projections[projections.length - 1].balance;

    // Update summary cards
    document.getElementById('yearsToRetirement').textContent = yearsToRetirement;
    document.getElementById('projectedBalance').textContent = formatCurrency(finalBalance);
    document.getElementById('annualContribution').textContent = formatCurrency(annualContribution);
    document.getElementById('totalContributed').textContent = formatCurrency(totalContributed);

    // Update table
    updateTable(projections);

    // Update chart
    updateChart(projections);

    // Show results section
    document.getElementById('resultsSection').style.display = 'block';
    
    // Scroll to results
    document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function updateTable(projections) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    // Show first year, every 5 years, and last year
    for (let i = 0; i < projections.length; i++) {
        const projection = projections[i];
        
        // Show every year if less than 20 years, otherwise every 5 years
        if (projections.length <= 20 || i === 0 || i === projections.length - 1 || i % 5 === 0) {
            const row = tableBody.insertRow();
            row.innerHTML = `
                <td>${projection.age}</td>
                <td>${projection.year}</td>
                <td>${formatCurrency(projection.contribution)}</td>
                <td>${formatCurrency(projection.gains)}</td>
                <td><strong>${formatCurrency(projection.balance)}</strong></td>
            `;
        }
    }
}

function updateChart(projections) {
    const ctx = document.getElementById('projectionChart').getContext('2d');
    
    // Prepare data
    const labels = projections.map(p => `Age ${p.age}`);
    const balanceData = projections.map(p => p.balance);
    const contributionCumulativeData = [];
    let cumulativeContribution = projections[0].contribution;
    contributionCumulativeData.push(cumulativeContribution);
    
    for (let i = 1; i < projections.length; i++) {
        cumulativeContribution += projections[i].contribution;
        contributionCumulativeData.push(cumulativeContribution);
    }

    // Destroy existing chart if it exists
    if (chart) {
        chart.destroy();
    }

    // Create new chart
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Total Savings Balance',
                    data: balanceData,
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 5,
                    pointBackgroundColor: '#667eea'
                },
                {
                    label: 'Cumulative Contributions',
                    data: contributionCumulativeData,
                    borderColor: '#764ba2',
                    backgroundColor: 'rgba(118, 75, 162, 0.05)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 5,
                    pointBackgroundColor: '#764ba2',
                    borderDash: [5, 5]
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        font: { size: 12 },
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: { size: 13 },
                    bodyFont: { size: 12 },
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + formatCurrency(context.parsed.y);
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return formatCurrencyShort(value);
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}

function formatCurrencyShort(value) {
    if (value >= 1000000) {
        return '$' + (value / 1000000).toFixed(1) + 'M';
    }
    if (value >= 1000) {
        return '$' + (value / 1000).toFixed(0) + 'K';
    }
    return '$' + value.toFixed(0);
}