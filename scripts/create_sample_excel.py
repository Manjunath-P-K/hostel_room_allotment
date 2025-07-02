import pandas as pd
import random
from datetime import datetime, timedelta

# Settings
num_groups = 20  # 20 groups
students_per_group = 3
total_students = num_groups * students_per_group
preferences = list(range(1, 61))  # Room numbers 1 to 60
start_date = datetime(2024, 6, 1)

print(f"Creating sample data for {num_groups} groups with {students_per_group} students each")
print(f"Total students: {total_students}")

data = []
student_counter = 1

for group_id in range(1, num_groups + 1):
    # Assign same preferences for all students in the group
    random.shuffle(preferences)
    pref1, pref2, pref3 = preferences[:3]
    
    print(f"Group {group_id}: Preferences = [{pref1}, {pref2}, {pref3}]")
    
    for student_in_group in range(students_per_group):
        name = f"Student_{student_counter}"
        # Generate different fee paid dates for each student (even within the same group)
        fee_paid_date = start_date + timedelta(days=random.randint(0, 30))
        
        data.append({
            "Student Name": name,
            "Preference 1": pref1,
            "Preference 2": pref2,
            "Preference 3": pref3,
            "Fee Paid Date": fee_paid_date.strftime("%Y-%m-%d"),
            "Fees Photo": f"student_{student_counter}_receipt.jpg"
        })
        student_counter += 1

# Create DataFrame
df = pd.DataFrame(data)

# Save to Excel
file_path = "../data/sample_students_grouped.xlsx"
df.to_excel(file_path, index=False)

print(f"\nSample Excel file '{file_path}' created successfully!")
print("\nFirst 15 rows of the data (showing 5 groups):")
print(df.head(15).to_string(index=False))

print(f"\nColumns in the file: {list(df.columns)}")
print(f"Total students: {len(df)}")
print(f"Total groups: {len(df) // 3}")

# Show preference distribution for first few groups
print("\nPreference distribution for first 5 groups:")
for i in range(0, min(15, len(df)), 3):
    group_num = (i // 3) + 1
    group_data = df.iloc[i:i+3]
    pref1 = group_data.iloc[0]['Preference 1']
    pref2 = group_data.iloc[0]['Preference 2'] 
    pref3 = group_data.iloc[0]['Preference 3']
    print(f"Group {group_num}: Students {i+1}-{i+3} -> Preferences: [{pref1}, {pref2}, {pref3}]")

print(f"\nFile saved as: {file_path}")
print("This file is ready to be uploaded to the hostel room allotment system!")
